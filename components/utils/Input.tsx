function Input (props:any) {
    return (
        <input {...props} className={"bg-reddit_dark-brighter rounded-md block "+ props.className} />
    );
}

export default Input;