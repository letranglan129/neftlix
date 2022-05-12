export default function TrailerItem({ trailer, styleImg }) {
    return (
        <div className="trailer-item ">
            <img
                src={`https://img.youtube.com/vi/${trailer.key}/0.jpg`}
                className=""
                style={styleImg}
            />
            <button className="trailer-play-button">
                <i className="fas fa-play"></i>
            </button>
        </div>
    )
}
