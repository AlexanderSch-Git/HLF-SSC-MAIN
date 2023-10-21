export default function Header(props) {
    return (
        <header className="bg-">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between">
                {props.children}
            </div>
        </header>
    );
}
