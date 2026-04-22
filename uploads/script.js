var W = window.innerWidth;
var H = window.innerHeight;
var svg = d3.select("#viz").attr("width", W).attr("height", H);
var world = svg.append("g").attr("class", "world");

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

var parseDT = d3.timeParse("%Y-%m-%d %H:%M:%S");
var parseDate = d3.timeParse("%Y-%m-%d");
function parseDate2(s) { return s.length > 10 ? parseDT(s) : parseDate(s); }

var annotation = d3.select("#annotation");
var statsPanel = d3.select("#stats-panel");

var gRaw, gLine, gFolded, gSplit, gFitM1, gFitted;
var xTime, yVol, xHour, yFold;
var axisRaw, axisLine, axisFold;

Promise.all([
    d3.csv("data/traffic.csv", function(d) {
        return { date: parseDate2(d.date_time), hour: +d.hour, volume: +d.traffic_volume,
                 weather: d.weather_main, weekend: d.weekend_indicator };
    }),
    d3.csv("data/models.csv", function(d) {
        return { name: d.Model, params: +d.Params, aic: +d.AIC, r2: +d.AdjR2 };
    })
]).then(function(res) {
    var data = res[0].filter(function(d) { return d.date && !isNaN(d.volume); });
    var models = res[1];
    setup(data);
    wire(data, models);
});

function styleDarkAxis(sel) {
    sel.selectAll("text").style("font-size", "13.67px").style("fill", "rgba(255,255,255,0.7)").style("font-family", "Inter, sans-serif");
    sel.selectAll("path, line").style("stroke", "rgba(255,255,255,0.25)");
}

function setup(data) {
    xTime = d3.scaleTime().domain(d3.extent(data, function(d) { return d.date; })).range([80, W - 80]);
    yVol = d3.scaleLinear().domain([0, d3.max(data, function(d) { return d.volume; })]).range([H - 100, 100]).nice();
    xHour = d3.scaleLinear().domain([0, 23]).range([80, W - 80]);
    yFold = d3.scaleLinear().domain([0, 7500]).range([H - 100, 140]).nice();

    // Raw axes
    axisRaw = world.append("g").style("opacity", 0);
    axisRaw.append("g").attr("transform", "translate(0," + (H - 100) + ")")
        .call(d3.axisBottom(xTime).ticks(7).tickFormat(d3.timeFormat("%b %d"))).call(styleDarkAxis);
    axisRaw.append("g").attr("transform", "translate(80,0)")
        .call(d3.axisLeft(yVol).ticks(6)).call(styleDarkAxis);
    axisRaw.append("text").attr("x", W / 2).attr("y", H - 50).attr("text-anchor", "middle")
        .style("font-size", "13.67px").style("fill", "rgba(255,255,255,0.8)").style("font-family", "Inter, sans-serif").text("Date");
    axisRaw.append("text").attr("transform", "rotate(-90)").attr("x", -H / 2).attr("y", 30).attr("text-anchor", "middle")
        .style("font-size", "13.67px").style("fill", "rgba(255,255,255,0.8)").style("font-family", "Inter, sans-serif").text("Vehicles per hour");

    // Folded axes (hour of day)
    axisFold = world.append("g").style("opacity", 0);
    axisFold.append("g").attr("transform", "translate(0," + (H - 100) + ")")
        .call(d3.axisBottom(xHour).ticks(12).tickFormat(function(d) { return d + ":00"; })).call(styleDarkAxis);
    axisFold.append("g").attr("transform", "translate(80,0)")
        .call(d3.axisLeft(yFold).ticks(6)).call(styleDarkAxis);
    axisFold.append("text").attr("x", W / 2).attr("y", H - 50).attr("text-anchor", "middle")
        .style("font-size", "13.67px").style("fill", "rgba(255,255,255,0.8)").style("font-family", "Inter, sans-serif").text("Hour of day");
    axisFold.append("text").attr("transform", "rotate(-90)").attr("x", -H / 2).attr("y", 30).attr("text-anchor", "middle")
        .style("font-size", "13.67px").style("fill", "rgba(255,255,255,0.8)").style("font-family", "Inter, sans-serif").text("Average vehicles per hour");

    gRaw = world.append("g");
    gRaw.selectAll("circle").data(data).enter().append("circle")
        .attr("cx", function(d) { return xTime(d.date); })
        .attr("cy", function(d) { return yVol(d.volume); })
        .attr("r", 1.4).attr("fill", "#4c9eff").attr("opacity", 0.35);

    gLine = world.append("g").style("opacity", 0);
    var subset = data.filter(function(d) {
        return d.date >= new Date(2018, 5, 4) && d.date < new Date(2018, 5, 11);
    }).sort(function(a, b) { return a.date - b.date; });
    var xSub = d3.scaleTime().domain(d3.extent(subset, function(d) { return d.date; })).range([100, W - 100]);
    var ySub = d3.scaleLinear().domain([0, d3.max(subset, function(d) { return d.volume; })]).range([H - 120, 140]).nice();

    axisLine = gLine.append("g");
    axisLine.append("g").attr("transform", "translate(0," + (H - 120) + ")")
        .call(d3.axisBottom(xSub).ticks(7).tickFormat(d3.timeFormat("%a %b %d"))).call(styleDarkAxis);
    axisLine.append("g").attr("transform", "translate(100,0)")
        .call(d3.axisLeft(ySub).ticks(6)).call(styleDarkAxis);
    axisLine.append("text").attr("x", W / 2).attr("y", H - 70).attr("text-anchor", "middle")
        .style("font-size", "13.67px").style("fill", "rgba(255,255,255,0.8)").style("font-family", "Inter, sans-serif").text("Date");
    axisLine.append("text").attr("transform", "rotate(-90)").attr("x", -H / 2).attr("y", 30).attr("text-anchor", "middle")
        .style("font-size", "13.67px").style("fill", "rgba(255,255,255,0.8)").style("font-family", "Inter, sans-serif").text("Vehicles per hour");

    var bands = [];
    var c = new Date(subset[0].date); c.setHours(0, 0, 0, 0);
    while (c < subset[subset.length - 1].date) {
        if (c.getDay() === 6) {
            var end = new Date(c); end.setDate(end.getDate() + 2);
            bands.push([new Date(c), end]);
        }
        c.setDate(c.getDate() + 1);
    }
    gLine.selectAll("rect").data(bands).enter().append("rect")
        .attr("x", function(d) { return xSub(d[0]); })
        .attr("y", 140)
        .attr("width", function(d) { return xSub(d[1]) - xSub(d[0]); })
        .attr("height", H - 260)
        .attr("fill", "#ffa94d").attr("opacity", 0.12);
    var lineGen = d3.line().x(function(d) { return xSub(d.date); }).y(function(d) { return ySub(d.volume); }).curve(d3.curveMonotoneX);
    gLine.append("path").datum(subset)
        .attr("fill", "none").attr("stroke", "#4c9eff").attr("stroke-width", 2.5).attr("d", lineGen);

    var byHour = Array.from(
        d3.rollup(data, function(v) { return d3.mean(v, function(d) { return d.volume; }); }, function(d) { return d.hour; }),
        function(e) { return { hour: e[0], mean: e[1] }; }
    ).sort(function(a, b) { return a.hour - b.hour; });

    gFolded = world.append("g").style("opacity", 0);
    var areaF = d3.area().x(function(d) { return xHour(d.hour); }).y0(H - 80).y1(function(d) { return yFold(d.mean); }).curve(d3.curveMonotoneX);
    gFolded.append("path").datum(byHour).attr("fill", "#4c9eff").attr("opacity", 0.25).attr("d", areaF);
    var lineF = d3.line().x(function(d) { return xHour(d.hour); }).y(function(d) { return yFold(d.mean); }).curve(d3.curveMonotoneX);
    gFolded.append("path").datum(byHour).attr("fill", "none").attr("stroke", "#4c9eff").attr("stroke-width", 3).attr("d", lineF);
    gFolded.selectAll("circle").data(byHour).enter().append("circle")
        .attr("cx", function(d) { return xHour(d.hour); }).attr("cy", function(d) { return yFold(d.mean); })
        .attr("r", 5).attr("fill", "#4c9eff").attr("stroke", "#0e1117").attr("stroke-width", 2);
    gFolded.append("text")
        .attr("x", xHour(7)).attr("y", yFold(byHour[7].mean) - 18).attr("text-anchor", "middle")
        .style("font-size", "14px").style("font-weight", "bold").style("fill", "#ffa94d").text("AM rush");
    gFolded.append("text")
        .attr("x", xHour(17)).attr("y", yFold(byHour[17].mean) - 18).attr("text-anchor", "middle")
        .style("font-size", "14px").style("font-weight", "bold").style("fill", "#ffa94d").text("PM rush");

    var rushBands = [[6, 9], [16, 19]];
    gFolded.selectAll("rect.rush").data(rushBands).enter().insert("rect", "path")
        .attr("class", "rush")
        .attr("x", function(d) { return xHour(d[0]); })
        .attr("y", 120)
        .attr("width", function(d) { return xHour(d[1]) - xHour(d[0]); })
        .attr("height", H - 200)
        .attr("fill", "#ffd43b").attr("opacity", 0).attr("class", "rush-band");

    var wkArr = Array.from(
        d3.rollup(data.filter(function(d) { return d.weekend === "Weekday"; }),
            function(v) { return d3.mean(v, function(d) { return d.volume; }); }, function(d) { return d.hour; }),
        function(e) { return { hour: e[0], mean: e[1] }; }
    ).sort(function(a, b) { return a.hour - b.hour; });
    var weArr = Array.from(
        d3.rollup(data.filter(function(d) { return d.weekend === "Weekend"; }),
            function(v) { return d3.mean(v, function(d) { return d.volume; }); }, function(d) { return d.hour; }),
        function(e) { return { hour: e[0], mean: e[1] }; }
    ).sort(function(a, b) { return a.hour - b.hour; });

    gSplit = world.append("g").style("opacity", 0);
    var lineS = d3.line().x(function(d) { return xHour(d.hour); }).y(function(d) { return yFold(d.mean); }).curve(d3.curveMonotoneX);
    gSplit.append("path").datum(wkArr).attr("fill", "none").attr("stroke", "#4c9eff").attr("stroke-width", 3.5).attr("d", lineS);
    gSplit.append("path").datum(weArr).attr("fill", "none").attr("stroke", "#ffa94d").attr("stroke-width", 3.5).attr("d", lineS);
    gSplit.append("text").attr("x", W - 100).attr("y", 160).attr("text-anchor", "end")
        .style("font-size", "20px").style("font-weight", "bold").style("fill", "#4c9eff").text("Weekday");
    gSplit.append("text").attr("x", W - 100).attr("y", 190).attr("text-anchor", "end")
        .style("font-size", "20px").style("font-weight", "bold").style("fill", "#ffa94d").text("Weekend");

    gFitM1 = world.append("g").style("opacity", 0);
    var xs = byHour.map(function(d) { return d.hour; });
    var ys = byHour.map(function(d) { return d.mean; });
    var xm = d3.mean(xs), ym = d3.mean(ys);
    var num = 0, den = 0;
    for (var i = 0; i < xs.length; i++) {
        num += (xs[i] - xm) * (ys[i] - ym);
        den += (xs[i] - xm) * (xs[i] - xm);
    }
    var slope = num / den, inter = ym - slope * xm;
    var m1pred = byHour.map(function(d) { return { hour: d.hour, pred: inter + slope * d.hour }; });
    gFitM1.append("path").datum(m1pred).attr("fill", "none").attr("stroke", "#ff6b6b").attr("stroke-width", 4)
        .attr("stroke-dasharray", "8,6")
        .attr("d", d3.line().x(function(d) { return xHour(d.hour); }).y(function(d) { return yFold(d.pred); }));

    gFitted = world.append("g").style("opacity", 0);
    var areaWk = d3.area().x(function(d) { return xHour(d.hour); }).y0(H - 80).y1(function(d) { return yFold(d.mean); }).curve(d3.curveMonotoneX);
    gFitted.append("path").datum(wkArr).attr("fill", "#4c9eff").attr("opacity", 0.22).attr("d", areaWk);
    gFitted.append("path").datum(weArr).attr("fill", "#ffa94d").attr("opacity", 0.22).attr("d", areaWk);
    gFitted.append("path").datum(wkArr).attr("fill", "none").attr("stroke", "#4c9eff").attr("stroke-width", 3).attr("d", lineS);
    gFitted.append("path").datum(weArr).attr("fill", "none").attr("stroke", "#ffa94d").attr("stroke-width", 3).attr("d", lineS);
}

function applyZoom(scale, tx, ty, dur) {
    world.transition().duration(dur || 1200).ease(d3.easeCubicInOut)
        .attr("transform", "translate(" + tx + "," + ty + ") scale(" + scale + ")");
}

function fade(sel, to, dur) {
    sel.transition().duration(dur || 700).style("opacity", to);
}

function setAnnotation(txt) {
    if (!txt) { annotation.classed("show", false); return; }
    annotation.text(txt).classed("show", true);
}

function showStats(title, rows, highlightIdx) {
    if (!rows) { statsPanel.classed("show", false); return; }
    var html = '<div class="sp-title">' + title + '</div><table>';
    rows.forEach(function(r, i) {
        html += '<tr' + (i === highlightIdx ? ' class="highlight"' : '') + '><td>' + r[0] + '</td><td>' + r[1] + '</td></tr>';
    });
    html += '</table>';
    statsPanel.html(html).classed("show", true);
}

function scene(i) {
    fade(gRaw, 0);
    fade(gLine, 0);
    fade(gFolded, 0);
    fade(gSplit, 0);
    fade(gFitM1, 0);
    fade(gFitted, 0);
    fade(axisRaw, 0);
    fade(axisFold, 0);
    gFolded.selectAll(".rush-band").transition().duration(400).attr("opacity", 0);
    showStats(null);
    setAnnotation("");

    if (i === 0) {
        fade(gRaw, 1);
        fade(axisRaw, 1);
        applyZoom(1, 0, 0);
        setAnnotation("4,411 hours, one sensor");
    } else if (i === 1) {
        fade(gLine, 1);
        applyZoom(1, 0, 0);
        setAnnotation("One week in June");
    } else if (i === 2) {
        fade(gFolded, 1);
        fade(axisFold, 1);
        applyZoom(1, 0, 0);
        setAnnotation("All 4,411 hours, folded by hour of day");
    } else if (i === 3) {
        fade(gFolded, 1);
        fade(axisFold, 1);
        gFolded.selectAll(".rush-band").transition().duration(600).attr("opacity", 0.22);
        applyZoom(1.1, -W * 0.05, -H * 0.04);
        setAnnotation("Morning rush (6-9 AM) and evening rush (4-7 PM)");
    } else if (i === 4) {
        fade(gSplit, 1);
        fade(axisFold, 1);
        applyZoom(1, 0, 0);
        setAnnotation("Weekday vs weekend profiles");
    } else if (i === 5) {
        fade(gSplit, 1);
        fade(axisFold, 1);
        applyZoom(1, 0, 0);
        showStats("Adj R\u00b2 scorecard", [
            ["Model 1: hour numeric", "0.22"],
            ["Model 2: hour factor", "0.85"],
            ["Model 3: interaction", "0.95"],
            ["Model 4: log response", "0.96"],
            ["Model 5: with lag", "0.98"]
        ]);
        setAnnotation("Watch the scorecard \u2192");
    } else if (i === 6) {
        fade(gFolded, 0.35);
        fade(axisFold, 1);
        fade(gFitM1, 1);
        applyZoom(1, 0, 0);
        showStats("Model 1", [
            ["Adj R\u00b2", "0.22"],
            ["Structure", "one straight line"],
            ["Misses", "both rush peaks"]
        ], 0);
        setAnnotation("Model 1: a straight line misses two peaks");
    } else if (i === 7) {
        fade(gFolded, 1);
        fade(axisFold, 1);
        applyZoom(1, 0, 0);
        showStats("Model 2", [
            ["Adj R\u00b2", "0.85"],
            ["Structure", "24 hour factors"],
            ["Captures", "rush hour peaks"]
        ], 0);
        setAnnotation("Model 2: one effect per hour");
    } else if (i === 8) {
        fade(gSplit, 1);
        fade(axisFold, 1);
        applyZoom(1, 0, 0);
        showStats("Model 3", [
            ["Adj R\u00b2", "0.95"],
            ["Adds", "hour x weekend"],
            ["Captures", "two populations"]
        ], 0);
        setAnnotation("Model 3: separate curves for weekday and weekend");
    } else if (i === 9) {
        fade(gSplit, 1);
        fade(axisFold, 1);
        applyZoom(1, 0, 0);
        showStats("Model 5", [
            ["Adj R\u00b2", "0.984"],
            ["Adds", "volume lag (1 hour)"],
            ["Durbin Watson", "0.41 \u2192 1.83"]
        ], 0);
        setAnnotation("Model 5: previous hour as a predictor");
    } else if (i === 10) {
        fade(gFitted, 1);
        fade(axisFold, 1);
        applyZoom(1, 0, 0);
        setAnnotation("Fitted weekday and weekend profiles from Model 3");
    } else if (i === 11) {
        fade(gFitted, 1);
        fade(axisFold, 1);
        applyZoom(1, 0, 0);
        setAnnotation("Time of day predicts nearly everything");
    }
}

function wire() {
    var scroller = scrollama();
    scroller.setup({ step: ".step", offset: 0.55, debug: false })
        .onStepEnter(function(r) {
            var idx = +r.element.getAttribute("data-step");
            scene(idx);
        });

    window.addEventListener("resize", function() {
        W = window.innerWidth; H = window.innerHeight;
        svg.attr("width", W).attr("height", H);
        scroller.resize();
    });

    scene(0);
}
