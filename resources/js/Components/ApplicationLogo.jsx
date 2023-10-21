// return image logo of the application uses resources/images/logo-light.png
export default function ApplicationLogo(props) {
    return (
        <a className="h-24 w-72" href="/">
            <img
                src="/images/logo-light.png"
                alt="Logo"
                className="object-contain h-24 w-72"
            />
        </a>
    );
}
