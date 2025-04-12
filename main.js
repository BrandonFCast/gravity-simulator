import { Config } from "./classes/Config.js";
import { Entity } from "./classes/Entity.js";

const cnv = document.getElementById('canvas');
const ctx = cnv.getContext('2d');

cnv.width = window.innerWidth;
cnv.height = window.innerHeight;

const config = new Config({ ctx });
Entity.setConfig(config);