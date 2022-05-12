export default function IfameVideo({ src, ...props }) {
    return (
        <iframe
            className="absolute"
            width="100%"
            height="100%"
            frameBorder="0"
            src={src}
            allowFullScreen
            {...props}
        ></iframe>
    )
}
