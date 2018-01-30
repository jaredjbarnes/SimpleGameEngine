const primaryColor = "#ffc821";
const secondaryColor = "#faf100";
const tertiaryColor = "#dcaa09";

export default (context, size) => {
    const width = size.width;
    const height = size.height;
    const padding = Math.round(((width + height) / 2) * 0.5);
    const lineWidth = Math.round(((width + height) / 2) * 0.5 / 2);
    const innerBorder = Math.round(((width + height) / 2) * 0.5 / 2.25);

    // Create a triangluar path
    context.beginPath();
    context.moveTo(padding + width / 2, padding);
    context.lineTo(padding + width, height + padding);
    context.lineTo(padding, height + padding);
    context.closePath();

    // Create fill gradient
    const gradient = context.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, primaryColor);
    gradient.addColorStop(1, secondaryColor);

    // Add a shadow around the object
    context.shadowBlur = Math.round(padding / 2);
    context.shadowColor = "black";

    // Stroke the outer outline
    context.lineWidth = lineWidth * 2;
    context.lineJoin = "round";
    context.strokeStyle = gradient;
    context.stroke();

    // Turn off the shadow, or all future fills will have shadows
    context.shadowColor = "transparent";

    // Fill the path
    context.fillStyle = gradient;
    context.fill();

    // Add a horizon reflection with a gradient to transparent
    gradient = context.createLinearGradient(0, padding, 0, padding + height);
    gradient.addColorStop(0, "transparent");
    gradient.addColorStop(0.5, "transparent");
    gradient.addColorStop(0.5, tertiaryColor);
    gradient.addColorStop(1, secondaryColor);

    context.fillStyle = gradient;
    context.fill();

    // Stroke the inner outline
    context.lineWidth = lineWidth;
    context.lineJoin = "round";
    context.strokeStyle = "#333";
    context.stroke();

    // Draw the text exclamation point
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = `bold ${Math.round(height * 0.75)}px 'Times New Roman', Times, serif`;
    context.fillStyle = "#333";

    context.fillText("!", padding + width / 2, padding + height / 1.5);

}