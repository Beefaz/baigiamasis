import InputField from "./InputField.jsx";
import "../../styles/form.scss";

const Form = ({props, onSubmit}) => {
  const {id, formFields, button, errors, error, message} = props;

  return (
    <form id={id} onSubmit={onSubmit}>
      {message && <div className="message">{message}</div>}
      {error && <small>{error}</small>}
      {formFields.map((formField) =>
        <InputField props={formField} key={`${id}-${formField.id}`} error={errors[formField.id]}/>
      )}
      <button type="submit">
        {button.text}
      </button>
    </form>
  )
};

export default Form;
