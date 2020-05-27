import React, { Component } from "react";
import "./App.css";
import html2canvas from "html2canvas";
import FileSaver from "file-saver";

interface State {
    cols: string[];
    sizes: string[];
}

class App extends Component<{}, State> {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            cols: ["衣長", "肩寬", "胸圍", "袖長"],
            sizes: ["S", "M", "L", "XL"],
        };
    }

    print = () => {
        const input = document.getElementById("table");
        if (input !== null)
            html2canvas(input).then((canvas) => {
                const imgData = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
                FileSaver.saveAs(imgData, "尺寸表.jpg");
            });
    };

    render() {
        return (
            <div>
                <button onClick={() => this.setState({ sizes: [...this.state.sizes, "新尺寸"] })}>增加尺寸</button>
                <button onClick={() => this.setState({ cols: [...this.state.cols, "新欄位"] })}>新增欄位</button>
                <div style={{ marginTop: 36, marginBottom: 36, padding: 24 }} id="table">
                    <table>
                        <tr>
                            <td className="colored-background">尺寸</td>
                            {this.state.cols.map((col, index) => (
                                <td className="colored-background">
                                    <input
                                        value={col}
                                        onChange={(e) => {
                                            var newcols = [];
                                            newcols = this.state.cols;
                                            newcols[index] = e.target.value;
                                            this.setState({ cols: newcols });
                                        }}
                                    />
                                </td>
                            ))}
                        </tr>
                        {this.state.sizes.map((size, index) => (
                            <tr>
                                <td className="colored-background">
                                    <input
                                        value={size}
                                        onChange={(e) => {
                                            var newsizes = [];
                                            newsizes = this.state.sizes;
                                            newsizes[index] = e.target.value;
                                            this.setState({ sizes: newsizes });
                                        }}
                                    ></input>
                                </td>
                                {this.state.cols.map(() => (
                                    <td>
                                        <input type="text" />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </table>
                </div>
                <button onClick={() => this.print()}>保存圖片</button>
            </div>
        );
    }
}

export default App;
