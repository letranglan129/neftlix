export default function Switches({ style }) {
    return (
        <div className="toggleWrapper" style={style}>
            <input
                type="checkbox"
                className="dn"
                id="dn"
                onChange={(e) => {
                    if (e.target.checked) {
                        document.documentElement.classList.remove('light')
                        document.documentElement.classList.add('dark')
                    } else {
                        document.documentElement.classList.remove('dark')
                        document.documentElement.classList.add('light')
                    }
                }}
            />
            <label htmlFor="dn" className="toggle">
                <span className="toggle__handler">
                    <span className="crater crater--1"></span>
                    <span className="crater crater--2"></span>
                    <span className="crater crater--3"></span>
                </span>
                <span className="star star--1"></span>
                <span className="star star--2"></span>
                <span className="star star--3"></span>
                <span className="star star--4"></span>
                <span className="star star--5"></span>
                <span className="star star--6"></span>
            </label>
        </div>
    )
}

Switches.Theme = ({ onChange, style, value }) => {
    return (
        <div className="toggleWrapper" style={style}>
            <input type="checkbox" className="dn" id="dn" onChange={onChange} checked={value}/>
            <label htmlFor="dn" className="toggle">
                <span className="toggle__handler">
                    <span className="crater crater--1"></span>
                    <span className="crater crater--2"></span>
                    <span className="crater crater--3"></span>
                </span>
                <span className="star star--1"></span>
                <span className="star star--2"></span>
                <span className="star star--3"></span>
                <span className="star star--4"></span>
                <span className="star star--5"></span>
                <span className="star star--6"></span>
            </label>
        </div>
    )
}
