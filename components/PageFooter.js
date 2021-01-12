// Represents the footer section
class PageFooter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiLoaded: false,
            failed: false,
            quickLinks: [],
            socialLinks: []
        };

        // Make the XHR call
        XHR('/footer/').done(json => {
            this.setState({
                apiLoaded: true,
                quickLinks: json["quickLinks"],
                socialLinks: json["social"]
            });

            // Directly set the copyright since it comes as HTML
            $('#footerCopyright').append(json["copyright"].html);
        }).fail(_ => this.setState({ failed: true }));
    }

    render() {
        // Display the loaded HTML or a loading/fail symbol
        if (this.state.apiLoaded) {
            return (
                <footer id="footer" className="footer columns has-text-centered is-primary has-text-white">
                    <div id="footerQuickLinks" className="column">
                        <h3 className="subtitle has-text-white">Quick Links</h3>
                        {this.state.quickLinks.map((value, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <a href={value["href"]}>{value["title"]}</a>
                                    <br />
                                </React.Fragment>
                            );
                        })}
                    </div>
                    <div id="footerCopyright" className="column is-two-thirds"></div>
                    <div id="footerSocialLinks" className="column">
                        <h3 className="subtitle has-text-white">{this.state.socialLinks.title}</h3>

                        <div className="box">
                            <p>{this.state.socialLinks.tweet}</p>
                            <p>{this.state.socialLinks.by}</p>
                        </div>

                        <a href={this.state.socialLinks.twitter}>Twitter</a>
                        &nbsp;|&nbsp;
                        <a href={this.state.socialLinks.facebook}>Facebook</a>
                    </div>
                </footer>
            );
        } else return <LoadOrFail failed={this.state.failed} />;
    }
}
