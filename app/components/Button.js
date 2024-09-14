const Button = ({ type = 'button', onClick, isActive = false, icon, children }) => {
  const baseClasses = 'flex justify-center w-full px-6 py-3 rounded-md text-l tracking-wide capitalize transition-colors duration-300 transform my-5 mx-1';
  const activeClasses = 'bg-primary text-white hover:bg-primary/80 focus:outline-none focus:ring focus:ring-primary/50 focus:ring-opacity-50';
  const inactiveClasses = 'text-primary border border-primary';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
