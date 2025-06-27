export default function PageRenderer({ routes }) {
    return (
        <>
            {routes.map(({ id, Component, props }) => (
                <section key={id} id={id}>
                    <Component {...props} />
                </section>
            ))}
        </>
    )
}