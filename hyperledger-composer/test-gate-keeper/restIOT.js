composer-rest-server -c IOTDevice1@test-gate-keeper -n always -w true

{
    "$class": "org.example.gate.AuthorizeGateAccess",
    "gate": "resource:org.example.gate.Gate#6755",
    "resident": "resource:org.example.gate.Resident#6914"
  }

  {
    "$class": "org.example.gate.OpenGate",
    "gate": "resource:org.example.gate.Gate#9431"
  }

  {
    "gate": "resource:org.example.gate.Gate#5742"
  }


Setuo Serial:
  ls -la /dev/ttyUSB0
  sudo chmod 666 /dev/ttyUSB0
  sudo cu -l /dev/ttyUSB0 -s 115200