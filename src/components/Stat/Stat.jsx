export default function Stat(props) {
  return (
    <>
      <div className={`Stat ${props.right == true ? "StatRight" : "StatLeft"}`}>
        <span className="StatTitle">{props.title}: </span>
        <span className="StatValue">{props.value}</span>
        {props.subvalue != null && (
          <div className="StatSub">
            <span className="StatSubTitle">{props.subvaluetitle}: </span>
            <span className="StatSubValue">{props.subvalue}</span>
          </div>
        )}
      </div>
    </>
  );
}
