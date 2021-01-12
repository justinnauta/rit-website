// Represents the minors section
class Minors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiLoaded: false,
            failed: false,
            minors: []
        };

        // Make the XHR call
        XHR('/minors/').done(json => {
            this.setState({
                apiLoaded: true,
                minors: json["UgMinors"]
            });

            // Turn the minors element into an accordion
            $('#minors').accordion({
                collapsible: true,
                active: false,
                heightStyle: "content"
            });
        }).fail(_ => this.setState({ failed: true }));
    }

    render() {
        // Display the loaded HTML or a loading/fail symbol
        if (this.state.apiLoaded) {
            return (
                <div id="minorsSection" className="section">
                    <h2 className="title">Minors</h2>
                    <div id="minors">
                        {this.state.minors.map(value => {
                            return (
                                <React.Fragment key={value["title"]}>
                                    <h3>{value["title"]}</h3>
                                    <div className="content">
                                        <p>{value["description"]}</p>
                                        <p>Courses: {value["courses"].map(c => c + ', ')}</p>
                                        <p>{value["note"]}</p>
                                    </div>
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            );
        } else return <LoadOrFail failed={this.state.failed} />;
    }
}
