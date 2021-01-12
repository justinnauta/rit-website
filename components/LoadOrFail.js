// Displays a loading symbol when loading and a fail message when failed to load
// Needs props: failed (Bool, whether or not the load failed)
class LoadOrFail extends React.Component {
    render() {
        if (this.props.failed) return <p>Unfortunately, the content could not be loaded.</p>;
        else return <img src="spinner.gif" />;
    }
}
