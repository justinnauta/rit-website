// Represents the about section
class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiLoaded: false,
            failed: false,
            values: []
        };

        // Make the XHR call
        XHR('/about/').done(json => {
            this.setState({
                apiLoaded: true,
                values: json
            });
        }).fail(_ => this.setState({ failed: true }));
    }

    render() {
        // Display the loaded HTML or a loading/fail symbol
        if (this.state.apiLoaded) {
            return (
                <div id="aboutSection" className="section content">
                    <h2 className="title">{this.state.values["title"]}</h2>
                    <p>{this.state.values["description"]}</p>
                    <blockquote>
                        <strong>"{this.state.values["quote"]}"</strong>
                        <br />
                        - {this.state.values["quoteAuthor"]}
                    </blockquote>
                </div>
            );
        } else return <LoadOrFail failed={this.state.failed} />;
    }
}
