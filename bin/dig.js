#!/usr/bin/env node

'use strict';

const {StubResolver} = require('../lib/resolver');
const wire = require('../lib/wire');

const {
  Message,
  Question,
  types,
  classes,
  opcodes
} = wire;

function log(obj) {
  console.dir(obj, {
    depth: 20,
    customInspect: true,
    colors: true
  });
}

async function resolve(name, type, host, port) {
  const resolver = new StubResolver('udp4');

  await resolver.open();

  try {
    return await resolver.lookup(name, type, port, host);
  } finally {
    await resolver.close();
  }
}

(async () => {
  const name = process.argv[2] || null;
  const type = process.argv[3] || null;
  const host = process.argv[4] || null;
  const port = (process.argv[5] | 0) || null;
  log(await resolve(name, type, host, port));
})();
