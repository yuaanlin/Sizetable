import React, { Component } from "react";

import GithubIcon from "../github.svg";

export default class Topnav extends Component {
    render() {
        return (
            <div className="topnav">
                <div className="topnav-left">
                    <p>Size Table Generator</p>
                    <p>尺寸表產生器</p>
                </div>
                <div className="topnav-right">
                    <a href="https://github.com/ken20001207/generate-sizetable">
                        <img src={GithubIcon} style={{ width: 32 }} alt="Github" />
                    </a>
                </div>
            </div>
        );
    }
}
