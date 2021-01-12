// Represents the degrees section
class Degrees extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiLoaded: false,
            failed: false,
            undergrad: [],
            grad: []
        };

        // Make the XHR call
        XHR('/degrees/').done(json => {
            this.setState({
                apiLoaded: true,
                undergrad: json["undergraduate"],
                grad: json["graduate"]
            });
        }).fail(_ => this.setState({ failed: true }));
    }

    render() {
        // Display the loaded HTML or a loading/fail symbol
        if (this.state.apiLoaded) {
            return (
                <div id="degreesSection" className="section has-background-light">
                    <h2 className="title">Degrees</h2>
                    <div id="degrees" className="columns is-multiline">
                        <div className="column">
                            <h3 className="subtitle has-text-centered">Undergraduate</h3>
                            <DegreeSection degrees={this.state.undergrad} keyPrefix="undergrad-" />
                        </div>
                        <div className="column">
                            <h3 className="subtitle has-text-centered">Graduate</h3>
                            <DegreeSection degrees={this.state.grad} keyPrefix="grad-" />
                        </div>
                    </div>
                    <hr />
                </div>
            );
        } else return <LoadOrFail failed={this.state.failed} />;
    }
}

// A specific section of degrees (Undergrad or Grad)
// Needs props: degrees (The array of degrees)
//              keyPrefix (Prefix for the list keys)
class DegreeSection extends React.Component {
    // Activates the dialog box when a "Learn More" button is clicked
    // e: The element clicked
    learnMore(e) {
        const id = '#' + e.target.parentNode.parentNode.parentNode.id + '-dialog';
        document.querySelector(id).classList.remove('is-hidden');
        $(id).dialog();
    }

    render() {
        return (
            <div className="columns is-multiline">
                {this.props.degrees.map(value => {
                    const idAndKey = this.props.keyPrefix + value["degreeName"].replace(/\s/g, '');
                    return (
                        <div id={idAndKey} key={idAndKey} className="column is-one-third-desktop is-one-half-tablet">
                            {/* Degree card */}
                            <div className="card">
                                <div className="card-header">
                                    <p className="card-header-title is-centered has-text-centered">{value["degreeName"].toUpperCase()}</p>
                                </div>
                                <div className="card-content has-text-centered">
                                    <p>{value["title"] ? value["title"] : ""}</p>
                                </div>
                                <div className="card-footer">
                                    <button className="button is-primary is-fullwidth learnMoreBtn" onClick={this.learnMore}>Learn More</button>
                                </div>
                            </div>

                            {/* Dialog box */}
                            <div id={idAndKey + "-dialog"} title={value["degreeName"].toUpperCase()} className="is-hidden has-text-centered">
                                <p className="subtitle">{value["title"]}</p>
                                <br />
                                <p>{value["description"]}</p>
                                <br />
                                <p>
                                    {value["concentrations"] ?
                                        'Concentrations:' + value["concentrations"].map(c => ' ' + c) :
                                        'Available Certificates:' + value["availableCertificates"].map(c => ' ' + c)}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}
