// Represents the people section
class People extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiLoaded: false,
            failed: false,
            title: "",
            subtitle: "",
            faculty: [],
            staff: []
        };

        // Make the XHR call
        XHR('/people/').done(json => {
            this.setState({
                apiLoaded: true,
                title: json["title"],
                subtitle: json["subTitle"],
                faculty: json["faculty"],
                staff: json["staff"]
            });
        }).fail(_ => this.setState({ failed: true }));
    }

    render() {
        // Display the loaded HTML or a loading/fail symbol
        if (this.state.apiLoaded) {
            return (
                <div id="peopleSection" className="section">
                    <h2 className="title">{this.state.title}</h2>
                    <h3 className="subtitle">Hover below to find out more.</h3>

                    {/* Faculty */}
                    <div className="container p-6">
                        <h3 className="subtitle is-3 has-text-centered mb-6">Faculty</h3>
                        <div className="columns is-multiline is-centered">
                            {this.state.faculty.map((value, index) => {
                                return (
                                    <div key={index} className="column is-one-quarter-widescreen is-one-third-desktop is-half-tablet peopleImg">
                                        <figure className="image is-3by4">
                                            <img src={value["imagePath"]} alt={"Image of " + value["name"]} />
                                            <div className="imgOverlay">
                                                <p className="title has-text-white">{value["name"]}</p>
                                                <p className="subtitle has-text-white">{value["title"]}</p>
                                                <p>Username: {value["username"]}</p>
                                                <p>Office: {value["office"]}</p>
                                                <p>Email: {value["email"]}</p>
                                                <p>Phone: {value["phone"]}</p>
                                            </div>
                                        </figure>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Staff */}
                    <div className="container p-6">
                        <h3 className="subtitle is-3 has-text-centered mb-6">Staff</h3>
                        <div className="columns is-multiline is-centered">
                            {this.state.staff.map((value, index) => {
                                return (
                                    <div key={index} className="column is-one-quarter-widescreen is-one-third-desktop is-half-tablet peopleImg">
                                        <figure className="image is-3by4">
                                            <img src={value["imagePath"]} alt={"Image of " + value["name"]} />
                                            <div className="imgOverlay">
                                                <p className="title has-text-white">{value["name"]}</p>
                                                <p className="subtitle has-text-white">{value["title"]}</p>
                                                <p>Username: {value["username"]}</p>
                                                <p>Office: {value["office"]}</p>
                                                <p>Email: {value["email"]}</p>
                                                <p>Phone: {value["phone"]}</p>
                                            </div>
                                        </figure>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            );
        } else return <LoadOrFail failed={this.state.failed} />;
    }
}
