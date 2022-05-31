function Textarea (props) {
    return (
        <textarea {...props} className={"bg-reddit_dark-brighter p-2 border border-reddit_dark-brightest rounded-md block "+ props.className} />
    );
}

export default Textarea;