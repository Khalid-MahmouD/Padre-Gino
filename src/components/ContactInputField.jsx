export default function ContactInput(props) {
  return (
    <input
      disabled={props.pending}
      name={props.name}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
}
