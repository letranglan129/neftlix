import Link from 'next/link'

const getClassName = (props) => {
    if (typeof props !== 'object') return ''

    return Object.keys(props).reduce((acc, key) => {
        if (props[key]) return `${acc} ${key}`
        else return acc
    }, '')
}

export default function Button({
    to,
    href,
    onClick,
    primary = 0,
    outline = 0,
    disabled = 0,
    rounded = 0,
    circle = 0,
    text = 0,
    small = 0,
    large = 0,
    leftIcon,
    rightIcon,
    children,
    classCustom ='',
    linkConfig,
    ...passProps
}) {
    const styleProps = {
        primary,
        outline,
        disabled,
        rounded,
        text,
        small,
        large,
        circle
    }

    const props = {
        onClick,
        ...passProps,
    }

    let Comp = 'button'

    const className = `button ${getClassName(styleProps)} ${classCustom}`

    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key]
            }
        })
    }

    if (to || href) Comp = 'a'

    if (to) props.href = to
    else if (href) props.href = href

    if (to)
        return (
            <Link href={to} {...linkConfig}>
                <Comp className={className} {...props}>
                    {leftIcon && <span className="icon">{leftIcon}</span>}
                    <span className="title">{children}</span>
                    {rightIcon && <span className="icon">{rightIcon}</span>}
                </Comp>
            </Link>
        )

    return (
        <Comp className={className} {...props}>
            {leftIcon && <span className="icon">{leftIcon}</span>}
            <span className="title">{children}</span>
            {rightIcon && <span className="icon">{rightIcon}</span>}
        </Comp>
    )
}
