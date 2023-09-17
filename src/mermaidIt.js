export function mermaidIt(records) {
  const nodes = [];
  const arrows = [];

  for (const recordKey in records) {
    const record = records[recordKey];

    if (record.type === "arrow") {
      const startShapeId = record.props.start?.boundShapeId;
      const endShapeId = record.props.end?.boundShapeId;
      console.log(startShapeId, endShapeId);
      if (!startShapeId || !endShapeId) {
        console.log("skipped arrow");
        continue;
      } else {
        console.log("didn't skip");
      }

      const arrow = {
        type: "arrow",
        startShapeId,
        endShapeId,
        style: "---",
      };
      arrows.push(arrow);
      // log(arrow)
    } else if (record.props?.geo === "rectangle") {
      const node = {
        type: "rectangle",
        text: record.props?.text || " ",
        id: record.id,
      };
      nodes.push(node);
      // log(node)
    } else if (record.props?.geo === "ellipse") {
      const node = {
        type: "ellipse",
        text: record.props?.text || " ",
        id: record.id,
      };
      nodes.push(node);
    } else if (record.props?.geo === "diamond") {
      const node = {
        type: "diamond",
        text: record.props?.text || " ",
        id: record.id,
      };
      nodes.push(node);
    }
  }

  // Using this mermaid flowchart as a reference: https://mermaid.live/edit#pako:eNpdkNFLwzAQxv-VkCeFbXWtdlsRwXVzLwMFfWv3cGuSJtgmIb06Rtv_3dTJQPN0-X7f3XFfRwvDOE2oqMypkOCQfGxyTfx7zlLpVIM1NIdfhUynT_2OI6mN5ueerG92hjTSWKt0eXsxrcmjd5G0248-TlAq_TlcWPrD-lfNe7LJ9mDR2MMf9HEyPdlm6k36Df-QdNz3vWQCEgHTAhxJwR3ohNbc1aCYv6IbO3KKktc8p4kvGRfQVpjTXA_eCi2a97MuaIKu5RPaWgbINwpKBzX1c6vmqm6ZQuOuYmWAcf_tKJ7tGFnpw_EjC6OFKke9dZWXJaJtkiAY8axUKNvjrDB10Cg25iu_VnEQh_ESwojHiwgeoogVx_lqKcL7uWCLu3kIdBiGbySmhBs
  let nodesContent = "";
  nodes.forEach((node) => {
    if (node.type === "ellipse") {
      nodesContent += `\n   ${node.id}(("${node.text}"))`;
    } else if (node.type === "rectangle") {
      nodesContent += `\n   ${node.id}("${node.text}")`;
    } else if (node.type === "diamond") {
      nodesContent += `\n   ${node.id}{"${node.text}"}`;
    }
  });
  if (nodes.length && arrows.length) {
    nodesContent += "\n";
  }
  let arrowsContent = "";
  arrows.forEach((arrow) => {
    console.log(arrow);
    arrowsContent += `\n   ${arrow.startShapeId} ${arrow.style} ${arrow.endShapeId}`;
  });
  const mermaidFlowchart = `flowchart TD${nodesContent}${arrowsContent}`;
  if (mermaidFlowchart === undefined) {
    // debugger;
  }
  return mermaidFlowchart;
}
function getRecord(doc, id) {
  return doc.records.find((record) => record.id === id);
}

function log(obj) {
  console.log(JSON.stringify(obj, null, 2));
}
