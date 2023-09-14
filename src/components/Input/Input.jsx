import "./index.scss";

export default function Input({ label, ...props }) {
  return (
    <div className="text-input">
      <label htmlFor={props.role}>
        {label}
        {props.question ? <img className="required" src="../question_mark.png" /> : null}
      </label>
      <input id={props.role} {...props} />
    </div>
  );
}
