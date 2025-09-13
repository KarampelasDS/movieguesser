export default function Button(props) {
  return (
    <div className="Button" onClick={props.onClick}>
      {props.text}
    </div>
  );
}
