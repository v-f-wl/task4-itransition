export const Title = ({label}: {label: string}) => {
  return ( 
    <h2 className="text-xl sm:text-3xl font-bold text-neutral-800">
      {label}
    </h2>
   );
}