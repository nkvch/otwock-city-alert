curl -X PUT \
  -H "Content-Type: application/json" \
  -d '{"location": {"center": [52.2296756, 21.0122287], "radius": 100}}' \
  http://localhost:3000/id/updateLocation