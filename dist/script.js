const bankOne = [
{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Heater-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },

{
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Heater-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },

{
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Heater-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },

{
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Heater-4',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },

{
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Clap',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },

{
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },

{
  keyCode: 90,
  keyTrigger: 'Z',
  id: "Kick-n'-Hat",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },

{
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },

{
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' }];



const DrumMachine = () => {
  const keys = bankOne;
  const [volume, setVolume] = React.useState(1);
  const [recording, setRecording] = React.useState("");
  const [speed, setSpeed] = React.useState(0.5);

  const playRecording = () => {
    let index = 0;
    let recordingArray = recording.split(" ");
    console.log(recordingArray[index]);
    const interval = setInterval(() => {
      const audioTag = document.getElementById(recordingArray[index]);
      audioTag.currentTime = 0;
      audioTag.volume = volume;
      audioTag.play();
      index++;
    }, speed * 600);
    setTimeout(() => {
      clearInterval(interval);
    }, 600 * speed * recordingArray.length - 1);
  };

  return /*#__PURE__*/(
    React.createElement("div", { id: "drum-machine", className: "container" }, /*#__PURE__*/
    React.createElement("div", { className: "clip-div" },
    keys.map((audioClip, index) => {
      return /*#__PURE__*/React.createElement(Pad, { key: index, audioClip: audioClip, volume: volume, setRecording: setRecording });
    })), /*#__PURE__*/

    React.createElement("div", { className: "control" }, /*#__PURE__*/
    React.createElement("h4", null, "Volume"), /*#__PURE__*/
    React.createElement("input", {
      type: "range",
      step: "0.01",
      value: volume,
      onChange: e => setVolume(e.target.value),
      max: "1",
      min: "0" }), /*#__PURE__*/

    React.createElement("h2", { id: "display" }), /*#__PURE__*/
    React.createElement("h2", null, recording),
    recording && /*#__PURE__*/
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("button", { className: "btn btn-success", onClick: playRecording }, "Play"), /*#__PURE__*/
    React.createElement("button", { className: "btn btn-danger", onClick: () => setRecording("") }, "clear"), /*#__PURE__*/
    React.createElement("br", null), /*#__PURE__*/
    React.createElement("h2", null, "Speed"), /*#__PURE__*/
    React.createElement("input", {
      type: "range",
      step: "0.01",
      value: speed,
      onChange: e => setSpeed(e.target.value),
      max: "1.2",
      min: "0.2" })))));






};

const Pad = ({ audioClip, volume, setRecording }) => {
  const [isActive, setIsActive] = React.useState(false);
  const [tag, setTag] = React.useState("");
  const handleKeyPress = e => {
    if (e.keyCode === audioClip.keyCode) {
      playSound();
    }
  };
  React.useEffect(() => {document.addEventListener("keydown", handleKeyPress);
    return () => {document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  const playSound = () => {
    const audioTag = document.getElementById(audioClip.keyTrigger);
    setIsActive(true);
    setTag(audioTag);
    setTimeout(() => setIsActive(false), 500);
    audioTag.currentTime = 0;
    audioTag.volume = volume;
    audioTag.play();
    document.getElementById("display").textContent = audioClip.id;
    setRecording(prev => prev + audioClip.keyTrigger + " ");
  };
  return /*#__PURE__*/(
    React.createElement("button", { id: audioClip.id, className: `drum-pad btn btn-primary ${isActive && "btn-secondary"}`, onClick: playSound }, /*#__PURE__*/
    React.createElement("audio", { id: audioClip.keyTrigger, className: "clip", src: audioClip.url }),
    audioClip.keyTrigger));


};
ReactDOM.render( /*#__PURE__*/React.createElement(DrumMachine, null), document.getElementById("root"));