var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    var Search = (function (_super) {
        __extends(Search, _super);
        function Search() {
            _super.apply(this, arguments);
        }
        Search.prototype.render = function () {
            return (React.createElement("div", null, "Search term: ", React.createElement("input", {type: "search", value: "React"})));
        };
        return Search;
    }(React.Component));
    exports.Search = Search;
});
//# sourceMappingURL=search.js.map