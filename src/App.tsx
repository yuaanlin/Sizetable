import React, { Component, lazy } from "react";
import "./App.css";
import html2canvas from "html2canvas";
import FileSaver from "file-saver";
const Topnav = lazy(() => import("./components/Topnav"));

interface State {
    cols: string[];
    sizes: string[];
    priting: boolean;
    fontSize: number;
    focusInputS: number | undefined;
    focusInputC: number | undefined;
}

class App extends Component<{}, State> {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            cols: ["衣長", "衣長", "衣長", "衣長"],
            sizes: ["S", "M", "L", "XL"],
            priting: false,
            fontSize: 36,
            focusInputC: undefined,
            focusInputS: undefined,
        };
    }

    componentDidMount = () => {
        document.addEventListener("keydown", this.keyboardHandler, false);
    };

    keyboardHandler = (e: KeyboardEvent) => {
        var fs = this.state.focusInputS;
        var fc = this.state.focusInputC;
        var l = this.state.cols.length;
        var s = this.state.sizes.length;
        if (fs !== undefined && fc !== undefined) {
            if (e.keyCode === 37) {
                if (fc !== 0) {
                    this.setState({ focusInputC: fc - 1 });
                    document.getElementById("(" + fs + "," + (fc - 1) + ")")?.focus();
                } else {
                    this.setState({ focusInputC: fc + l - 1 });
                    document.getElementById("(" + fs + "," + (fc + l - 1) + ")")?.focus();
                }
            } else if (e.keyCode === 38) {
                if (fs === 0) {
                    this.setState({ focusInputS: s - 1 });
                    document.getElementById("(" + (s - 1) + "," + fc + ")")?.focus();
                } else {
                    this.setState({ focusInputS: fs - 1 });
                    document.getElementById("(" + (fs - 1) + "," + fc + ")")?.focus();
                }
            } else if (e.keyCode === 39) {
                if (fc !== l - 1) {
                    this.setState({ focusInputC: fc + 1 });
                    document.getElementById("(" + fs + "," + (fc + 1) + ")")?.focus();
                } else {
                    this.setState({ focusInputC: fc - l + 1 });
                    document.getElementById("(" + fs + "," + (fc - l + 1) + ")")?.focus();
                }
            } else if (e.keyCode === 40) {
                if (fs === s - 1) {
                    this.setState({ focusInputS: 0 });
                    document.getElementById("(" + 0 + "," + fc + ")")?.focus();
                } else {
                    this.setState({ focusInputS: fs + 1 });
                    document.getElementById("(" + (fs + 1) + "," + fc + ")")?.focus();
                }
            }
        }
    };

    print = async () => {
        this.setState({ priting: true }, () => {
            const input = document.getElementById("table");
            if (input !== null)
                html2canvas(input, { scrollY: 0 }).then((canvas) => {
                    const imgData = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
                    FileSaver.saveAs(imgData, "尺寸表.jpg");
                    this.setState({ priting: false });
                });
        });
    };

    render() {
        return (
            <div>
                <div style={{ marginTop: 48 }}>
                    <Topnav />
                    <div style={{ marginRight: 36, display: "inline-block" }}>
                        <button className="setting" onClick={() => this.setState({ fontSize: this.state.fontSize - 1 })}>
                            縮小字體
                        </button>
                        <input
                            value={this.state.fontSize}
                            onChange={(e) => {
                                if (!isNaN(+e.target.value)) this.setState({ fontSize: +e.target.value });
                            }}
                            className="setting"
                            style={{ width: 40, padding: 11 }}
                        />
                        <button className="setting" onClick={() => this.setState({ fontSize: this.state.fontSize + 1 })}>
                            放大字體
                        </button>
                    </div>
                    <div style={{ marginRight: 36, display: "inline-block" }}>
                        <button
                            className="setting"
                            onClick={() => {
                                this.setState({ sizes: [...this.state.sizes, "新尺寸"] });
                            }}
                        >
                            增加尺寸
                        </button>
                        <button
                            className="setting"
                            onClick={() => {
                                this.setState({ cols: [...this.state.cols, "新欄位"] });
                            }}
                        >
                            增加欄位
                        </button>
                    </div>

                    <button className="setting" onClick={() => this.print()}>
                        保存圖片
                    </button>
                </div>

                <div style={{ marginTop: 36, marginBottom: 36, padding: 24 }} id="table">
                    <input defaultValue="測量單位：cm (公分)、kg(公斤)" style={{ fontSize: this.state.fontSize, width: "90%" }} />
                    <table>
                        <tr style={{ lineHeight: 0.5 }}>
                            <td className="colored-background" style={{ fontSize: this.state.fontSize }}>
                                尺寸
                            </td>
                            {this.state.cols.map((col, index) => (
                                <td className="colored-background">
                                    <input
                                        style={{ fontSize: this.state.fontSize }}
                                        value={col}
                                        onChange={(e) => {
                                            var newcols = [];
                                            newcols = this.state.cols;
                                            newcols[index] = e.target.value;
                                            this.setState({ cols: newcols });
                                        }}
                                    />
                                    {this.state.priting ? (
                                        <p />
                                    ) : (
                                        <button
                                            onClick={() => {
                                                var newcols = [];
                                                newcols = this.state.cols;
                                                newcols.splice(index, 1);
                                                this.setState({ cols: newcols });
                                            }}
                                        >
                                            刪除
                                        </button>
                                    )}
                                </td>
                            ))}
                        </tr>
                        {this.state.sizes.map((size, size_index) => (
                            <tr style={{ lineHeight: 0.2 }}>
                                <td className="colored-background" style={{ width: 300 }}>
                                    <input
                                        style={{ fontSize: this.state.fontSize, width: "90%" }}
                                        value={size}
                                        onChange={(e) => {
                                            var newsizes = [];
                                            newsizes = this.state.sizes;
                                            newsizes[size_index] = e.target.value;
                                            this.setState({ sizes: newsizes });
                                        }}
                                    ></input>
                                    {this.state.priting ? (
                                        <p />
                                    ) : (
                                        <button
                                            onClick={() => {
                                                var newsizes = [];
                                                newsizes = this.state.sizes;
                                                newsizes.splice(size_index, 1);
                                                this.setState({ sizes: newsizes });
                                            }}
                                        >
                                            刪除
                                        </button>
                                    )}
                                </td>
                                {this.state.cols.map((col, col_index) => (
                                    <td>
                                        <input
                                            onClick={() => this.setState({ focusInputS: size_index, focusInputC: col_index })}
                                            id={"(" + size_index + "," + col_index + ")"}
                                            style={{ fontSize: this.state.fontSize }}
                                            type="text"
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </table>
                    <input defaultValue="因測量方法不同，2-3cm 誤差屬正常範圍" style={{ width: "90%", fontSize: this.state.fontSize }} />
                </div>
            </div>
        );
    }
}

export default App;
