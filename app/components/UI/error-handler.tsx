const ErrorHandler = ({label}: {label: string}) => {
  return ( 
    <div className="text-red-400">
        {label}
      </div>
   )
}
 
export default ErrorHandler;