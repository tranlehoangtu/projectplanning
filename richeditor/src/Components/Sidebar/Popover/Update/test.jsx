import React from "react";
import PropTypes from "prop-types";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { orange, pink, green } from "@material-ui/core/colors";

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const theme = createMuiTheme({
    overrides: {
        MuiTabs: {
            indicator: {
                backgroundColor: orange[700],
            },
        },
        MuiTab: {
            root: {
                "&:hover": {
                    backgroundColor: pink[100],
                    color: pink[700],
                },
            },
            selected: {
                backgroundColor: orange[100],
                color: orange[700],
                "&:hover": {
                    backgroundColor: green[100],
                    color: green[700],
                },
            },
        },
    },
});

class SimpleTabs extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <AppBar position="static">
                        <Tabs value={value} onChange={this.handleChange}>
                            <Tab label="Item One" />
                            <Tab label="Item Two" />
                            <Tab label="Item Three" href="#basic-tabs" />
                        </Tabs>
                    </AppBar>
                    {value === 0 && <TabContainer>Item One</TabContainer>}
                    {value === 1 && <TabContainer>Item Two</TabContainer>}
                    {value === 2 && <TabContainer>Item Three</TabContainer>}
                </div>
            </MuiThemeProvider>
        );
    }
}

SimpleTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default SimpleTabs;
