import {useRef} from "react";
import uploadSvg from '../../assets/images/svg/upload-photo.svg'

const InputField = ({props, error}) => {
  const {label, ...fieldProps} = props;
  const ref = useRef(null);

  const onFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      ref.current.src = URL.createObjectURL(files[0]);
    }
  };

  const renderComponent = (fieldProps) => {
    let {element, fileName, ...inputProps} = fieldProps;
    inputProps = {...inputProps, name: inputProps.id};
    const components = {
      input: <input {...inputProps} />,
      textarea: <textarea {...inputProps} rows="20"/>,
      file: <div className="file-field">
        <img src={`${import.meta.env.VITE_FILE_URL}/${fileName}`} ref={ref} alt="img"/>
        <input {...inputProps} onChange={onFileChange}/>
        <div className="upload-btn">
          <img src={uploadSvg} alt="upload"/>
        </div>
      </div>,
      date: <input {...inputProps}/>
    }

    if (inputProps.type === 'file') return components.file;
    if (inputProps.type === 'date') return components.date;
    if (element === 'textarea') return components.textarea;
    return components.input;
  }

  return <div className="input-wrapper">
    {label && <label htmlFor={fieldProps.id}>{label}</label>}
    {renderComponent({...fieldProps})}
    {error && <small>{error}</small>}
  </div>;
}

export default InputField;
