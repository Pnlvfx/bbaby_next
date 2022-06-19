const LoaderPlaceholder = (props) => {
      const loaderStyles = {
        width: '100%',
        overflow: 'hidden',
        position: props.container ? 'absolute' : 'relative',
        ...props.extraStyles
      };

      const loaderSwipeStyles = {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        background: 'linear-gradient(to right, #272729 10%, #272729 50%, #272729 90%)',
        animation: 'loaderSwipeAnim 1.2s cubic-bezier(0.4, 0.0, 0.2, 1) infinite',
        height: '100%'
    }
  return (
    <div style={loaderStyles} className=''>
        <div style={loaderSwipeStyles}>
          <hr className='border-reddit_border'/>

        </div>
    </div>
  )
}

export default LoaderPlaceholder