export default function Button(props) {
  return (
    <div
      className="Button"
      style={props.size && { fontSize: `${props.size}px` }}
      onClick={props.onClick}
    >
      {props.text}
    </div>
  );
}
