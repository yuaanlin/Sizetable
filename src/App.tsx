import React, { Component } from "react";
import "./App.css";
import html2canvas from "html2canvas";
import FileSaver from "file-saver";
import { resolve } from "dns";

interface State {
    cols: string[];
    sizes: string[];
    priting: boolean;
}

class App extends Component<{}, State> {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            cols: ["衣長", "衣長", "衣長", "衣長"],
            sizes: ["S", "M", "L", "XL"],
            priting: false,
        };
    }

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
                <button onClick={() => this.setState({ sizes: [...this.state.sizes, "新尺寸"] })}>增加尺寸</button>
                <button onClick={() => this.setState({ cols: [...this.state.cols, "新欄位"] })}>新增欄位</button>
                <button onClick={() => this.print()}>保存圖片</button>
                <div style={{ marginTop: 36, marginBottom: 36, padding: 24 }} id="table">
                    <input defaultValue="測量單位：cm (公分)、kg(公斤)" style={{ width: "90%" }} />
                    <table>
                        <tr style={{ lineHeight: 0.5 }}>
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
                        {this.state.sizes.map((size, index) => (
                            <tr style={{ lineHeight: 0.2 }}>
                                <td className="colored-background" style={{ width: 300 }}>
                                    <input
                                        value={size}
                                        onChange={(e) => {
                                            var newsizes = [];
                                            newsizes = this.state.sizes;
                                            newsizes[index] = e.target.value;
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
                                                newsizes.splice(index, 1);
                                                this.setState({ sizes: newsizes });
                                            }}
                                        >
                                            刪除
                                        </button>
                                    )}
                                </td>
                                {this.state.cols.map(() => (
                                    <td>
                                        <input type="text" />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </table>
                    <input defaultValue="因測量方法不同，2-3cm 誤差屬正常範圍" style={{ width: "90%" }} />
                </div>
            </div>
        );
    }
}

export default App;
