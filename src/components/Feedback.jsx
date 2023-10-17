const Feedback = ({children, tipo}) => {
  return (
    <div className={`alert alert-${tipo} mb-4' role='alert text-center`}>
      <div className='d-flex gap-3'>
        <div className='flex-grow-1'>
          <div className='fw-medium'>Atención</div>
          <ul className='list-unstyled mb-0'>
            <li>
              {children}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
