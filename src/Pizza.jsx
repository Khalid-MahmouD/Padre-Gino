// const Pizza = (props) => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, props.name),
//     React.createElement("p", {}, props.description),
//   ]);
// };

const Pizza = (props) => {
    return (
        <div className="pizza">
            <h1>{props.name}</h1>
            <p>{props.description}</p>
        </div>
    )
}
export default Pizza