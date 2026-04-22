var CHART_W = 960;
var CHART_H = 460;
var MARGIN = { top: 30, right: 40, bottom: 60, left: 75 };
var IW = CHART_W - MARGIN.left - MARGIN.right;
var IH = CHART_H - MARGIN.top - MARGIN.bottom;

var tip = d3.select("#tooltip");
function showTip(e, html) {
    tip.style("display", "block").html(html)
        .style("left", (e.pageX + 14) + "px")
        .style("top", (e.pageY - 20) + "px");
}
function moveTip(e) {
    tip.style("left", (e.pageX + 14) + "px")
        .style("top", (e.pageY - 20) + "px");
}
function hideTip() { tip.style("display", "none"); }

// Minneapolis comparison R2 values (from the group project)
var MPLS_R2 = {
    "Model 1": 0.218,
    "Model 2": 0.850,
    "Model 3": 0.947,
    "Stepwise": 0.850,
    "Model 4": 0.963,
    "Model 5": 0.984
};

var parseDT = d3.timeParse("%Y-%m-%d %H:%M:%S");
var parseDate = d3.timeParse("%Y-%m-%d");
function parseDate2(s) { return s.length > 10 ? parseDT(s) : parseDate(s); }

Promise.all([
    d3.csv("data/traffic.csv", function(d) {
        return {
            date: parseDate2(d.date_time),
            hour: +d.hour,
            volume: +d.traffic_volume,
            dow: d.day_of_week,
            weekend: d.weekend_indicator
        };
    }),
    d3.csv("data/models.csv", function(d) {
        return { name: d.Model, params: +d.Params, aic: +d.AIC, r2: +d.AdjR2 };
    })
]).then(function(res) {
    var data = res[0].filter(function(d) { return d.date && !isNaN(d.volume); });
    var models = res[1];

    var renderers = {
        raw: function(svg) { drawRaw(svg, data); },
        line: function(svg) { drawLine(svg, data); },
        daily: function(svg) { drawDaily(svg, data); },
        split: function(svg) { drawSplit(svg, data); },
        models: function(svg) { drawModels(svg, models); },
        fits: function(svg) { drawFits(svg, data); },
        residuals: function(svg) { drawResiduals(svg, data); },
        lag: function(svg) { drawLag(svg, data); },
        fitted: function(svg) { drawFitted(svg, data); },
        compare: function(svg) { drawCompare(svg, models); }
    };

    d3.selectAll(".chart-container").each(function() {
        var name = this.getAttribute("data-chart");
        var fn = renderers[name];
        if (!fn) return;
        var svg = d3.select(this).append("svg")
            .attr("viewBox", "0 0 " + CHART_W + " " + CHART_H)
            .attr("preserveAspectRatio", "xMidYMid meet")
            .style("width", "100%").style("height", "auto")
            .style("max-height", (CHART_H + 40) + "px");
        fn(svg);
    });

    var io = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
            if (e.isIntersecting) e.target.classList.add("in");
        });
    }, { threshold: 0.12 });
    d3.selectAll("figure.full").each(function() { io.observe(this); });
});


function makeG(svg) {
    return svg.append("g").attr("transform", "translate(" + MARGIN.left + "," + MARGIN.top + ")");
}

function styleAxis(g) {
    g.selectAll("text").style("font-size", "13.67px").style("fill", "#555a63");
    g.selectAll("path, line").style("stroke", "#b8b4a8");
}

function addAxisLabels(g, xl, yl) {
    if (xl) g.append("text").attr("class", "axis-label")
        .attr("x", IW / 2).attr("y", IH + 45).attr("text-anchor", "middle").text(xl);
    if (yl) g.append("text").attr("class", "axis-label")
        .attr("transform", "rotate(-90)").attr("x", -IH / 2).attr("y", -55)
        .attr("text-anchor", "middle").text(yl);
}


function drawRaw(svg, data) {
    var g = makeG(svg);
    var x = d3.scaleTime().domain(d3.extent(data, function(d) { return d.date; })).range([0, IW]);
    var y = d3.scaleLinear().domain([0, d3.max(data, function(d) { return d.volume; })]).range([IH, 0]).nice();

    g.append("g").attr("class", "axis").attr("transform", "translate(0," + IH + ")")
        .call(d3.axisBottom(x).ticks(7).tickFormat(d3.timeFormat("%b %d"))).call(styleAxis);
    g.append("g").attr("class", "axis").call(d3.axisLeft(y).ticks(6)).call(styleAxis);

    g.selectAll("circle").data(data).enter().append("circle")
        .attr("cx", function(d) { return x(d.date); })
        .attr("cy", function(d) { return y(d.volume); })
        .attr("r", 2).attr("fill", "#1864ab").attr("opacity", 0.4)
        .on("mouseover", function(e, d) {
            d3.select(this).attr("r", 5).attr("opacity", 1);
            showTip(e, "<strong>" + d3.timeFormat("%a %b %d, %H:00")(d.date) + "</strong><br>" +
                "Volume: " + d.volume.toLocaleString());
        })
        .on("mousemove", moveTip)
        .on("mouseout", function() { d3.select(this).attr("r", 2).attr("opacity", 0.4); hideTip(); });

    addAxisLabels(g, "Date", "Vehicles per hour (southbound)");
}


function drawLine(svg, data) {
    var g = makeG(svg);
    var subset = data.filter(function(d) {
        return d.date >= new Date(2025, 4, 5) && d.date < new Date(2025, 4, 12);
    }).sort(function(a, b) { return a.date - b.date; });

    var x = d3.scaleTime().domain(d3.extent(subset, function(d) { return d.date; })).range([0, IW]);
    var y = d3.scaleLinear().domain([0, d3.max(subset, function(d) { return d.volume; })]).range([IH, 0]).nice();

    var bands = [];
    var c = new Date(subset[0].date); c.setHours(0, 0, 0, 0);
    while (c < subset[subset.length - 1].date) {
        if (c.getDay() === 6) {
            var end = new Date(c); end.setDate(end.getDate() + 2);
            bands.push([new Date(c), end]);
        }
        c.setDate(c.getDate() + 1);
    }
    g.selectAll("rect.wknd").data(bands).enter().append("rect")
        .attr("class", "wknd")
        .attr("x", function(d) { return x(d[0]); }).attr("y", 0)
        .attr("width", function(d) { return x(d[1]) - x(d[0]); })
        .attr("height", IH)
        .attr("fill", "#f59f00").attr("opacity", 0.1);

    var lineGen = d3.line().x(function(d) { return x(d.date); }).y(function(d) { return y(d.volume); }).curve(d3.curveMonotoneX);
    g.append("path").datum(subset).attr("fill", "none").attr("stroke", "#1864ab").attr("stroke-width", 2).attr("d", lineGen);

    g.append("g").attr("class", "axis").attr("transform", "translate(0," + IH + ")")
        .call(d3.axisBottom(x).ticks(7).tickFormat(d3.timeFormat("%a %b %d"))).call(styleAxis);
    g.append("g").attr("class", "axis").call(d3.axisLeft(y).ticks(6)).call(styleAxis);
    addAxisLabels(g, "Date", "Vehicles per hour");
}


function drawDaily(svg, data) {
    var g = makeG(svg);
    var arr = Array.from(
        d3.rollup(data, function(v) { return d3.mean(v, function(d) { return d.volume; }); }, function(d) { return d.hour; }),
        function(e) { return { hour: e[0], mean: e[1] }; }
    ).sort(function(a, b) { return a.hour - b.hour; });

    var x = d3.scaleLinear().domain([0, 23]).range([0, IW]);
    var y = d3.scaleLinear().domain([0, d3.max(arr, function(d) { return d.mean; })]).range([IH, 0]).nice();

    var area = d3.area().x(function(d) { return x(d.hour); }).y0(IH).y1(function(d) { return y(d.mean); }).curve(d3.curveMonotoneX);
    g.append("path").datum(arr).attr("fill", "#1864ab").attr("opacity", 0.15).attr("d", area);
    var line = d3.line().x(function(d) { return x(d.hour); }).y(function(d) { return y(d.mean); }).curve(d3.curveMonotoneX);
    g.append("path").datum(arr).attr("fill", "none").attr("stroke", "#1864ab").attr("stroke-width", 2.5).attr("d", line);

    g.selectAll("circle").data(arr).enter().append("circle")
        .attr("cx", function(d) { return x(d.hour); }).attr("cy", function(d) { return y(d.mean); })
        .attr("r", 4).attr("fill", "#1864ab").attr("stroke", "white").attr("stroke-width", 1.5)
        .on("mouseover", function(e, d) {
            d3.select(this).attr("r", 7);
            showTip(e, "<strong>" + d.hour + ":00</strong><br>Avg: " + Math.round(d.mean).toLocaleString());
        })
        .on("mousemove", moveTip)
        .on("mouseout", function() { d3.select(this).attr("r", 4); hideTip(); });

    [{ h: 7, l: "AM rush" }, { h: 17, l: "PM rush" }].forEach(function(p) {
        var pt = arr.find(function(a) { return a.hour === p.h; });
        g.append("text").attr("x", x(p.h)).attr("y", y(pt.mean) - 14)
            .attr("text-anchor", "middle").style("font-size", "12px").style("font-weight", "bold").style("fill", "#c92a2a").text(p.l);
    });

    g.append("g").attr("class", "axis").attr("transform", "translate(0," + IH + ")")
        .call(d3.axisBottom(x).ticks(12).tickFormat(function(d) { return d + ":00"; })).call(styleAxis);
    g.append("g").attr("class", "axis").call(d3.axisLeft(y).ticks(6)).call(styleAxis);
    addAxisLabels(g, "Hour of day", "Mean vehicles per hour");
}


function drawSplit(svg, data) {
    var g = makeG(svg);
    function byHour(f) {
        return Array.from(
            d3.rollup(data.filter(f), function(v) { return d3.mean(v, function(d) { return d.volume; }); }, function(d) { return d.hour; }),
            function(e) { return { hour: e[0], mean: e[1] }; }
        ).sort(function(a, b) { return a.hour - b.hour; });
    }
    var wk = byHour(function(d) { return d.weekend === "Weekday"; });
    var we = byHour(function(d) { return d.weekend === "Weekend"; });

    var x = d3.scaleLinear().domain([0, 23]).range([0, IW]);
    var y = d3.scaleLinear().domain([0, d3.max(wk.concat(we), function(d) { return d.mean; })]).range([IH, 0]).nice();

    var line = d3.line().x(function(d) { return x(d.hour); }).y(function(d) { return y(d.mean); }).curve(d3.curveMonotoneX);
    g.append("path").datum(wk).attr("fill", "none").attr("stroke", "#1864ab").attr("stroke-width", 3).attr("d", line);
    g.append("path").datum(we).attr("fill", "none").attr("stroke", "#e67700").attr("stroke-width", 3).attr("d", line);

    function addCircles(arr, color, label) {
        g.selectAll("circle." + label).data(arr).enter().append("circle").attr("class", label)
            .attr("cx", function(d) { return x(d.hour); }).attr("cy", function(d) { return y(d.mean); })
            .attr("r", 3.5).attr("fill", color).attr("stroke", "white").attr("stroke-width", 1)
            .on("mouseover", function(e, d) {
                d3.select(this).attr("r", 7);
                showTip(e, "<strong>" + label + " at " + d.hour + ":00</strong><br>Avg: " + Math.round(d.mean).toLocaleString());
            })
            .on("mousemove", moveTip)
            .on("mouseout", function() { d3.select(this).attr("r", 3.5); hideTip(); });
    }
    addCircles(wk, "#1864ab", "Weekday");
    addCircles(we, "#e67700", "Weekend");

    var leg = g.append("g").attr("transform", "translate(" + (IW - 160) + ",10)");
    [{ l: "Weekday", c: "#1864ab" }, { l: "Weekend", c: "#e67700" }].forEach(function(it, i) {
        var r = leg.append("g").attr("transform", "translate(0," + (i * 22) + ")");
        r.append("line").attr("x1", 0).attr("x2", 22).attr("y1", 6).attr("y2", 6).attr("stroke", it.c).attr("stroke-width", 3);
        r.append("text").attr("x", 28).attr("y", 10).attr("class", "legend-text").text(it.l);
    });

    g.append("g").attr("class", "axis").attr("transform", "translate(0," + IH + ")")
        .call(d3.axisBottom(x).ticks(12).tickFormat(function(d) { return d + ":00"; })).call(styleAxis);
    g.append("g").attr("class", "axis").call(d3.axisLeft(y).ticks(6)).call(styleAxis);
    addAxisLabels(g, "Hour of day", "Mean vehicles per hour");
}


function drawModels(svg, models) {
    var g = makeG(svg);
    var short = {
        "M1 hour numeric": "Model 1: hour numeric",
        "M2 hour factor": "Model 2: hour factor",
        "M3 hour_f x weekend": "Model 3: interaction",
        "Stepwise on M2": "Stepwise",
        "M4 log(y) with interaction": "Model 4: log response",
        "M5 add 1-hour lag": "Model 5: with lag"
    };
    models.forEach(function(d) { d.label = short[d.name] || d.name; });

    var x = d3.scaleBand().domain(models.map(function(d) { return d.label; })).range([0, IW]).padding(0.25);
    var y = d3.scaleLinear().domain([0, 1]).range([IH, 0]);
    var col = ["#adb5bd", "#748ffc", "#4263eb", "#748ffc", "#4263eb", "#1864ab"];

    g.selectAll("rect").data(models).enter().append("rect")
        .attr("x", function(d) { return x(d.label); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.r2); })
        .attr("height", function(d) { return IH - y(d.r2); })
        .attr("fill", function(d, i) { return col[i]; })
        .on("mouseover", function(e, d) {
            d3.select(this).attr("opacity", 0.75);
            showTip(e, "<strong>" + d.label + "</strong><br>Adj R&sup2;: " + d.r2.toFixed(3) +
                "<br>AIC: " + Math.round(d.aic).toLocaleString() + "<br>Params: " + d.params);
        })
        .on("mousemove", moveTip)
        .on("mouseout", function() { d3.select(this).attr("opacity", 1); hideTip(); });

    g.selectAll("text.vl").data(models).enter().append("text").attr("class", "vl")
        .attr("x", function(d) { return x(d.label) + x.bandwidth() / 2; })
        .attr("y", function(d) { return y(d.r2) - 6; })
        .attr("text-anchor", "middle").style("font-size", "13px").style("font-weight", "bold").style("fill", "#1a1a1a")
        .text(function(d) { return d.r2.toFixed(2); });

    g.append("g").attr("class", "axis").attr("transform", "translate(0," + IH + ")")
        .call(d3.axisBottom(x)).call(styleAxis)
        .selectAll("text").attr("transform", "rotate(-18)").attr("dy", "1em").style("text-anchor", "end");
    g.append("g").attr("class", "axis").call(d3.axisLeft(y).ticks(6).tickFormat(d3.format(".0%"))).call(styleAxis);
    addAxisLabels(g, "", "Adjusted R\u00b2");
}


function drawFits(svg, data) {
    var g = makeG(svg);
    var hourly = Array.from(
        d3.rollup(data, function(v) { return d3.mean(v, function(d) { return d.volume; }); }, function(d) { return d.hour; }),
        function(e) { return { hour: e[0], actual: e[1] }; }
    ).sort(function(a, b) { return a.hour - b.hour; });

    var wkArr = Array.from(
        d3.rollup(data.filter(function(d) { return d.weekend === "Weekday"; }),
            function(v) { return d3.mean(v, function(d) { return d.volume; }); }, function(d) { return d.hour; }),
        function(e) { return { hour: e[0], pred: e[1] }; }
    ).sort(function(a, b) { return a.hour - b.hour; });
    var weArr = Array.from(
        d3.rollup(data.filter(function(d) { return d.weekend === "Weekend"; }),
            function(v) { return d3.mean(v, function(d) { return d.volume; }); }, function(d) { return d.hour; }),
        function(e) { return { hour: e[0], pred: e[1] }; }
    ).sort(function(a, b) { return a.hour - b.hour; });

    var xs = hourly.map(function(d) { return d.hour; });
    var ys = hourly.map(function(d) { return d.actual; });
    var xm = d3.mean(xs), ym = d3.mean(ys);
    var num = 0, den = 0;
    for (var i = 0; i < xs.length; i++) {
        num += (xs[i] - xm) * (ys[i] - ym);
        den += (xs[i] - xm) * (xs[i] - xm);
    }
    var slope = num / den, inter = ym - slope * xm;
    var m1 = hourly.map(function(d) { return { hour: d.hour, pred: inter + slope * d.hour }; });
    var m2 = hourly.map(function(d) { return { hour: d.hour, pred: d.actual }; });

    var panelW = (IW - 40) / 3;
    var panelH = IH - 30;
    var x = d3.scaleLinear().domain([0, 23]).range([36, panelW - 16]);
    var y = d3.scaleLinear().domain([0, d3.max(hourly, function(d) { return d.actual; }) * 1.1]).range([panelH - 36, 10]).nice();

    var panels = [
        { title: "Model 1: hour numeric", sub: "R\u00b2 = 0.23", fit: m1, c: "#e8590c", fit2: null },
        { title: "Model 2: hour factor", sub: "R\u00b2 = 0.87", fit: m2, c: "#4263eb", fit2: null },
        { title: "Model 3: interaction", sub: "R\u00b2 = 0.97", fit: wkArr, c: "#1864ab", fit2: weArr }
    ];

    panels.forEach(function(p, i) {
        var px = i * (panelW + 20);
        var panel = g.append("g").attr("transform", "translate(" + px + ",0)");
        panel.append("rect").attr("x", 0).attr("y", 0).attr("width", panelW).attr("height", panelH)
            .attr("fill", "#fbfaf6").attr("stroke", "#dee2e6").attr("rx", 4);
        panel.append("text").attr("x", panelW / 2).attr("y", 20).attr("text-anchor", "middle")
            .style("font-size", "13px").style("font-weight", "bold").text(p.title);
        panel.append("text").attr("x", panelW / 2).attr("y", 36).attr("text-anchor", "middle")
            .style("font-size", "12px").style("fill", "#555").text(p.sub);

        var plot = panel.append("g").attr("transform", "translate(0,30)");
        plot.append("g").attr("transform", "translate(0," + (panelH - 66) + ")")
            .call(d3.axisBottom(x).ticks(4).tickFormat(function(d) { return d + "h"; }))
            .selectAll("text").style("font-size", "11px");
        plot.append("g").attr("transform", "translate(36,0)")
            .call(d3.axisLeft(y).ticks(4).tickFormat(function(d) { return (d / 1000) + "k"; }))
            .selectAll("text").style("font-size", "11px");

        plot.selectAll("circle").data(hourly).enter().append("circle")
            .attr("cx", function(d) { return x(d.hour); })
            .attr("cy", function(d) { return y(d.actual) - 30; })
            .attr("r", 2.5).attr("fill", "#adb5bd");

        var line = d3.line().x(function(d) { return x(d.hour); }).y(function(d) { return y(d.pred) - 30; }).curve(d3.curveMonotoneX);
        plot.append("path").datum(p.fit).attr("fill", "none").attr("stroke", p.c).attr("stroke-width", 2.8).attr("d", line);
        if (p.fit2) plot.append("path").datum(p.fit2).attr("fill", "none").attr("stroke", "#e67700").attr("stroke-width", 2.8).attr("d", line);
    });
}


function drawResiduals(svg, data) {
    var g = makeG(svg);
    var byH = d3.rollup(data, function(v) { return d3.mean(v, function(d) { return d.volume; }); }, function(d) { return d.hour; });
    var byHW = d3.rollup(data, function(v) { return d3.mean(v, function(d) { return d.volume; }); }, function(d) { return d.weekend; }, function(d) { return d.hour; });

    var r2 = data.map(function(d) { return { fitted: byH.get(d.hour), resid: d.volume - byH.get(d.hour) }; });
    var r3 = data.map(function(d) {
        var m = byHW.get(d.weekend); var p = m ? m.get(d.hour) : 0;
        return { fitted: p, resid: d.volume - p };
    });

    var halfW = (IW - 30) / 2;
    var xExt = d3.extent(r3.concat(r2), function(d) { return d.fitted; });
    var rExt = d3.extent(r3.concat(r2), function(d) { return d.resid; });
    var xS = d3.scaleLinear().domain(xExt).range([48, halfW - 16]).nice();
    var yS = d3.scaleLinear().domain(rExt).range([IH - 30, 16]).nice();

    [
        { t: "Model 2 residuals: mild funnel", sub: "Heteroscedasticity", d: r2, c: "#e8590c", off: 0 },
        { t: "Model 3 residuals: tighter", sub: "More uniform", d: r3, c: "#1864ab", off: halfW + 30 }
    ].forEach(function(p) {
        var panel = g.append("g").attr("transform", "translate(" + p.off + ",0)");
        panel.append("rect").attr("x", 0).attr("y", 0).attr("width", halfW).attr("height", IH - 10)
            .attr("fill", "#fbfaf6").attr("stroke", "#dee2e6").attr("rx", 4);
        panel.append("text").attr("x", halfW / 2).attr("y", 20).attr("text-anchor", "middle")
            .style("font-size", "13px").style("font-weight", "bold").text(p.t);
        panel.append("text").attr("x", halfW / 2).attr("y", 36).attr("text-anchor", "middle")
            .style("font-size", "12px").style("fill", p.c).text(p.sub);

        panel.append("line").attr("x1", 48).attr("x2", halfW - 16)
            .attr("y1", yS(0)).attr("y2", yS(0)).attr("stroke", "#999").attr("stroke-dasharray", "3,3");

        panel.selectAll("circle").data(p.d).enter().append("circle")
            .attr("cx", function(d) { return xS(d.fitted); })
            .attr("cy", function(d) { return yS(d.resid); })
            .attr("r", 1.6).attr("fill", p.c).attr("opacity", 0.35);

        panel.append("g").attr("transform", "translate(0," + (IH - 30) + ")")
            .call(d3.axisBottom(xS).ticks(5).tickFormat(function(d) { return (d / 1000) + "k"; }))
            .selectAll("text").style("font-size", "11px");
        panel.append("g").attr("transform", "translate(48,0)")
            .call(d3.axisLeft(yS).ticks(5).tickFormat(function(d) { return (d / 1000) + "k"; }))
            .selectAll("text").style("font-size", "11px");

        panel.append("text").attr("x", halfW / 2).attr("y", IH + 5).attr("text-anchor", "middle")
            .style("font-size", "12px").style("fill", "#555").text("Fitted volume");
    });
}


function drawLag(svg, data) {
    var g = makeG(svg);
    var sorted = data.slice().sort(function(a, b) { return a.date - b.date; });
    var pairs = [];
    for (var i = 1; i < sorted.length; i++) {
        var dh = (sorted[i].date - sorted[i - 1].date) / 3600000;
        if (dh > 0 && dh <= 1.1) pairs.push({ prev: sorted[i - 1].volume, now: sorted[i].volume, date: sorted[i].date });
    }

    var maxV = d3.max(pairs, function(d) { return Math.max(d.prev, d.now); });
    var x = d3.scaleLinear().domain([0, maxV]).range([0, IW]).nice();
    var y = d3.scaleLinear().domain([0, maxV]).range([IH, 0]).nice();

    g.append("line").attr("x1", x(0)).attr("y1", y(0)).attr("x2", x(maxV)).attr("y2", y(maxV))
        .attr("stroke", "#c92a2a").attr("stroke-dasharray", "4,4");

    g.selectAll("circle").data(pairs).enter().append("circle")
        .attr("cx", function(d) { return x(d.prev); })
        .attr("cy", function(d) { return y(d.now); })
        .attr("r", 2.2).attr("fill", "#1864ab").attr("opacity", 0.4)
        .on("mouseover", function(e, d) {
            d3.select(this).attr("r", 6).attr("opacity", 1);
            showTip(e, "<strong>" + d3.timeFormat("%a %b %d, %H:00")(d.date) + "</strong><br>" +
                "Previous hour: " + d.prev.toLocaleString() + "<br>This hour: " + d.now.toLocaleString());
        })
        .on("mousemove", moveTip)
        .on("mouseout", function() { d3.select(this).attr("r", 2.2).attr("opacity", 0.4); hideTip(); });

    var stats = g.append("g").attr("transform", "translate(" + (IW - 230) + ",20)");
    stats.append("rect").attr("x", -12).attr("y", -18).attr("width", 230).attr("height", 92)
        .attr("fill", "rgba(255,255,255,0.95)").attr("stroke", "#1864ab").attr("rx", 4);
    [
        { k: "Adj R\u00b2 before lag", v: "0.965" },
        { k: "Adj R\u00b2 after lag", v: "0.982" },
        { k: "Durbin Watson before", v: "0.69" },
        { k: "Durbin Watson after", v: "1.99" }
    ].forEach(function(r, i) {
        stats.append("text").attr("x", 0).attr("y", i * 20).style("font-size", "13px").style("fill", "#333").text(r.k);
        stats.append("text").attr("x", 210).attr("y", i * 20).attr("text-anchor", "end")
            .style("font-size", "13px").style("font-weight", "bold").style("fill", "#1864ab").text(r.v);
    });

    g.append("g").attr("class", "axis").attr("transform", "translate(0," + IH + ")")
        .call(d3.axisBottom(x).ticks(6)).call(styleAxis);
    g.append("g").attr("class", "axis").call(d3.axisLeft(y).ticks(6)).call(styleAxis);
    addAxisLabels(g, "Volume at hour t-1", "Volume at hour t");
}


function drawFitted(svg, data) {
    var g = makeG(svg);
    function byH(f) {
        return Array.from(
            d3.rollup(data.filter(f), function(v) { return d3.mean(v, function(d) { return d.volume; }); }, function(d) { return d.hour; }),
            function(e) { return { hour: e[0], mean: e[1] }; }
        ).sort(function(a, b) { return a.hour - b.hour; });
    }
    var wk = byH(function(d) { return d.weekend === "Weekday"; });
    var we = byH(function(d) { return d.weekend === "Weekend"; });

    var x = d3.scaleLinear().domain([0, 23]).range([0, IW]);
    var y = d3.scaleLinear().domain([0, d3.max(wk.concat(we), function(d) { return d.mean; })]).range([IH, 0]).nice();

    var area = d3.area().x(function(d) { return x(d.hour); }).y0(IH).y1(function(d) { return y(d.mean); }).curve(d3.curveMonotoneX);
    g.append("path").datum(wk).attr("fill", "#1864ab").attr("opacity", 0.22).attr("d", area);
    g.append("path").datum(we).attr("fill", "#e67700").attr("opacity", 0.22).attr("d", area);

    var line = d3.line().x(function(d) { return x(d.hour); }).y(function(d) { return y(d.mean); }).curve(d3.curveMonotoneX);
    g.append("path").datum(wk).attr("fill", "none").attr("stroke", "#1864ab").attr("stroke-width", 3).attr("d", line);
    g.append("path").datum(we).attr("fill", "none").attr("stroke", "#e67700").attr("stroke-width", 3).attr("d", line);

    g.append("text").attr("x", IW - 10).attr("y", 20).attr("text-anchor", "end")
        .style("font-size", "14px").style("font-weight", "bold").style("fill", "#1864ab").text("Weekday");
    g.append("text").attr("x", IW - 10).attr("y", 40).attr("text-anchor", "end")
        .style("font-size", "14px").style("font-weight", "bold").style("fill", "#e67700").text("Weekend");

    g.append("g").attr("class", "axis").attr("transform", "translate(0," + IH + ")")
        .call(d3.axisBottom(x).ticks(12).tickFormat(function(d) { return d + ":00"; })).call(styleAxis);
    g.append("g").attr("class", "axis").call(d3.axisLeft(y).ticks(6)).call(styleAxis);
    addAxisLabels(g, "Hour of day", "Mean vehicles per hour");
}


function drawCompare(svg, models) {
    var g = makeG(svg);
    var labels = ["Model 1", "Model 2", "Model 3", "Model 4", "Model 5"];
    var atlR2 = {
        "Model 1": null, "Model 2": null, "Model 3": null, "Model 4": null, "Model 5": null
    };
    var m = {
        "M1 hour numeric": "Model 1",
        "M2 hour factor": "Model 2",
        "M3 hour_f x weekend": "Model 3",
        "M4 log(y) with interaction": "Model 4",
        "M5 add 1-hour lag": "Model 5"
    };
    models.forEach(function(row) {
        var key = m[row.name];
        if (key) atlR2[key] = row.r2;
    });

    var data = labels.map(function(lb) {
        return { label: lb, mpls: MPLS_R2[lb], atl: atlR2[lb] };
    });

    var x0 = d3.scaleBand().domain(labels).range([0, IW]).padding(0.25);
    var x1 = d3.scaleBand().domain(["mpls", "atl"]).range([0, x0.bandwidth()]).padding(0.1);
    var y = d3.scaleLinear().domain([0, 1]).range([IH, 0]);

    var colors = { mpls: "#7048e8", atl: "#1864ab" };
    var city = { mpls: "Minneapolis", atl: "Atlanta" };

    var grp = g.selectAll(".grp").data(data).enter().append("g")
        .attr("class", "grp")
        .attr("transform", function(d) { return "translate(" + x0(d.label) + ",0)"; });

    ["mpls", "atl"].forEach(function(k) {
        grp.append("rect")
            .attr("x", x1(k)).attr("width", x1.bandwidth())
            .attr("y", function(d) { return y(d[k]); })
            .attr("height", function(d) { return IH - y(d[k]); })
            .attr("fill", colors[k])
            .on("mouseover", function(e, d) {
                d3.select(this).attr("opacity", 0.75);
                showTip(e, "<strong>" + d.label + "</strong><br>" + city[k] + ": " + d[k].toFixed(3));
            })
            .on("mousemove", moveTip)
            .on("mouseout", function() { d3.select(this).attr("opacity", 1); hideTip(); });

        grp.append("text")
            .attr("x", x1(k) + x1.bandwidth() / 2)
            .attr("y", function(d) { return y(d[k]) - 5; })
            .attr("text-anchor", "middle")
            .style("font-size", "10px").style("font-weight", "bold").style("fill", colors[k])
            .text(function(d) { return d[k].toFixed(2); });
    });

    var leg = g.append("g").attr("transform", "translate(" + (IW - 200) + ",10)");
    [{ l: "Minneapolis", c: colors.mpls }, { l: "Atlanta", c: colors.atl }].forEach(function(it, i) {
        var r = leg.append("g").attr("transform", "translate(0," + (i * 22) + ")");
        r.append("rect").attr("width", 16).attr("height", 16).attr("fill", it.c);
        r.append("text").attr("x", 22).attr("y", 13).attr("class", "legend-text").text(it.l);
    });

    g.append("g").attr("class", "axis").attr("transform", "translate(0," + IH + ")")
        .call(d3.axisBottom(x0)).call(styleAxis);
    g.append("g").attr("class", "axis").call(d3.axisLeft(y).ticks(6).tickFormat(d3.format(".0%"))).call(styleAxis);
    addAxisLabels(g, "Model", "Adjusted R\u00b2");
}
