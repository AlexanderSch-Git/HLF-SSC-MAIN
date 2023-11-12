// return image logo of the application uses resources/images/logo-light.png
export default function ApplicationLogo(props) {
    return (
        <a className="object-fill h-full" href="/">
            {/* img fitting on height */}
            <img
                src="/img/logo-light.png"
                alt="Logo"
                className="h-full object-cover"
            />
        </a>
    );
}
