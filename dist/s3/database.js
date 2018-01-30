"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Load the SDK for JavaScript
const AWS = require("aws-sdk");
// Load credentials and set region from JSON file
AWS.config.loadFromPath('../config/awsconfig.json');
