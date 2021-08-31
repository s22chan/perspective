/******************************************************************************
 *
 * Copyright (c) 2017, the Perspective Authors.
 *
 * This file is part of the Perspective library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */

const path = require("path");

const utils = require("@finos/perspective-test");
const simple_tests = require("@finos/perspective-viewer/test/js/simple_tests.js");
const render_warning_tests = require("@finos/perspective-viewer/test/js/render_warning_tests.js");

const {withTemplate} = require("./simple-template");
withTemplate("heatmap", "Heatmap");

function get_contents(temp) {
    return async function(page) {
        return await page.evaluate(async temp => {
            const viewer = document.querySelector(`perspective-viewer perspective-viewer-d3fc-${temp}`).shadowRoot.querySelector("svg");
            return viewer.outerHTML || "MISSING";
        }, temp);
    };
}

utils.with_server({}, () => {
    describe.page(
        "heatmap.html",
        () => {
            simple_tests.default(get_contents("heatmap"));
            // render_warning_tests.default("Heatmap");
        },
        {reload_page: false, root: path.join(__dirname, "..", "..", "..")}
    );
});
