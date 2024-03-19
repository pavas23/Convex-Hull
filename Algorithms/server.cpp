#include <iostream>
#include "httplib.h"
#include <nlohmann/json.hpp>
#include<bits/stdc++.h>
#include "JarvisMarch.h"

using namespace std;
using json = nlohmann::json;

void handle_get(const httplib::Request& req, httplib::Response& res) {
    res.set_content("Hello, from C++ HTTP server!", "text/plain");
}

void handle_post_jarvis_march(const httplib::Request& req, httplib::Response& res) {
     res.set_header("Access-Control-Allow-Origin", "*");
       res.set_header("Access-Control-Allow-Headers", "Content-Type");
    // Check if the Content-Type is application/json
    if (req.has_header("Content-Type") && req.get_header_value("Content-Type") == "application/json") {
        try {
            // Parse the JSON body
            json json_body = json::parse(req.body);

            vector<Point> points;
            for(const auto& ele : json_body["points"]){
                Point p;
                p.x = ele[0].get<int>();
                p.y = ele[1].get<int>();
                points.push_back(p);
            }

            vector<Edge> ans = convexHull(points);

            json json_array = json::array();
            for (const auto& edge : ans) {
                json edge_json;
                edge_json["p1"]["x"] = edge.p1.x;
                edge_json["p1"]["y"] = edge.p1.y;
                edge_json["p2"]["x"] = edge.p2.x;
                edge_json["p2"]["y"] = edge.p2.y;
                edge_json["flag"] = edge.flag;
                json_array.push_back(edge_json);
            }
            
            // Generate the response JSON
            res.set_content(json_array.dump(), "application/json");
        } catch (const std::exception& e) {
            // If parsing fails, return an error response
            res.status = 400;
            res.set_content("Error: Invalid JSON format", "text/plain");
        }
    } else {
        // If Content-Type is not application/json, return an error response
        res.status = 400;
        res.set_content("Error: Content-Type must be application/json", "text/plain");
    }
}

int main() {
    httplib::Server svr;

    // Define routes and handlers for GET and POST requests
    svr.Get("/", handle_get);
    svr.Post("/jarvis-march",handle_post_jarvis_march);

    // Start the server and listen for incoming requests on port 8080
    svr.listen("localhost", 8080);

    return 0;
}