const Input = ({ type, name, value, onChange, label, placeholder, additionalClass = '' }) => (
    <div className="mt-4">
      <label htmlFor={name} className="block mb-2 text-sm dark:text-text-light text-text-dark">{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`block w-full px-5 py-3 mt-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white bg-white border border-gray-200 rounded-md text-gray-700 placeholder-gray-400 focus:border-primary dark:focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40 ${additionalClass}`}
      />
    </div>
  );
  
  export default Input;
  