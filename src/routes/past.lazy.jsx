import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Suspense, use, useState } from "react";
import { getPastOrder, getPastOrders } from "../api";
import ErrorBoundary from "../ErrorBoundary";
import Modal from "../Modal";
import { formatCurrency } from "../useCurrency";
export const Route = createLazyFileRoute("/past")({
  component: ErrorBoundaryWrappedPastOrderRoutes,
});
// the key is promise handling with suspense

function ErrorBoundaryWrappedPastOrderRoutes() {
  const pageVar = useState(1);
  const loadedPromise = useQuery({
    queryKey: ["past-orders", pageVar[0]],
    queryFn: () => getPastOrders(pageVar[0]),
    staleTime: 30000,
  }).promise;

  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="past-orders">
            <h2>Loading Past Orders …</h2>
          </div>
        }
      >
        <PastOrdersRoute loadedPromise={loadedPromise} pageVar={pageVar} />
      </Suspense>
    </ErrorBoundary>
  );
}
function PastOrdersRoute({ loadedPromise, pageVar }) {
  const data = use(loadedPromise);
  const [page, setPage] = pageVar;
  const [focusedOrder, setFocusedOrder] = useState();

  const { isLoading: isLoadingPastOrder, data: pastOrderData } = useQuery({
    queryKey: ["past-order", focusedOrder],
    queryFn: () => getPastOrder(focusedOrder),
    staleTime: 86400000, //one day
    // enabled: !!focusedOrder, // dependency
    enabled: Boolean(focusedOrder), // dependency
  });

  return (
    <div className="past-orders">
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Date</td>
            <td>Time</td>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.order_id}>
              <td>
                <button onClick={() => setFocusedOrder(order.order_id)}>
                  {order.order_id}
                </button>
              </td>
              <td>{order.date}</td>
              <td>{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pages">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <div>{page}</div>
        <button disabled={data.length < 10} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
      {focusedOrder ? (
        <Modal>
          <h2>Order #{focusedOrder}</h2>
          {isLoadingPastOrder ? (
            <p>Loading...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <td>Image</td>
                  <td>Name</td>
                  <td>Size</td>
                  <td>Quantity</td>
                  <td>Price</td>
                  <td>Total</td>
                </tr>
              </thead>
              <tbody>
                {pastOrderData.orderItems.map((pizza) => (
                  <tr key={`${pizza.pizzaTypeId}_${pizza.size}`}>
                    <td>
                      <img src={pizza.image} alt={pizza.name} />
                    </td>
                    <td>{pizza.name}</td>
                    <td>{pizza.size}</td>
                    <td>{pizza.quantity}</td>
                    <td>{formatCurrency(pizza.price)}</td>
                    <td>{formatCurrency(pizza.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <button onClick={() => setFocusedOrder()}>Close</button>
        </Modal>
      ) : null}
    </div>
  );
}
