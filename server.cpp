#include <iostream>
#include "httplib.h"
#include <nlohmann/json.hpp>
#include<bits/stdc++.h>

using namespace std;
using json = nlohmann::json;

void handle_get(const httplib::Request& req, httplib::Response& res) {
    res.set_content("Hello, from C++ HTTP server!", "text/plain");
}

void handle_post(const httplib::Request& req, httplib::Response& res) {
    // Check if the Content-Type is application/json
    if (req.has_header("Content-Type") && req.get_header_value("Content-Type") == "application/json") {
        try {
            // Parse the JSON body
            json json_body = json::parse(req.body);

            int sum = 0;
            for(const auto& ele : json_body["vector"]){
                sum += ele.get<int>();
                cout<<ele<<endl;
            }
            cout<<sum<<endl;

            // Generate the response JSON
            res.set_content(json_body.dump(), "application/json");
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
    svr.Post("/", handle_post);

    // Start the server and listen for incoming requests on port 8080
    svr.listen("localhost", 8080);

    return 0;
}
