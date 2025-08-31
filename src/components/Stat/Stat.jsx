export default function Stat(props) {
  return (
    <div className="Stat">
      <span className="StatTitle">{props.title}: </span>
      <span className="StatValue">{props.value}</span>
    </div>
  );
}
