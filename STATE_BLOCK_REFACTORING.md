# State and Block API Refactoring

## Summary

Successfully separated State and Block into independent modules with their own APIs. Updated Panchayat schema to use blockId reference instead of blockName string.

## New Modules Created

### 1. State Module

**Location:** `src/modules/state/`

**Schema:**

- `stateName` (string, required, unique)
- `stateCode` (string, optional)
- Timestamps (createdAt, updatedAt)

**Endpoints:**

- `POST /states` - Create a new state
- `GET /states` - Get all states
- `GET /states/:id` - Get state by ID
- `PATCH /states/:id` - Update a state
- `DELETE /states/:id` - Delete a state

### 2. Block Module

**Location:** `src/modules/block/`

**Schema:**

- `blockName` (string, required)
- `stateId` (ObjectId, required, references State)
- Virtual field: `state` (populated)
- Timestamps (createdAt, updatedAt)

**Endpoints:**

- `POST /blocks` - Create a new block
- `GET /blocks?stateId=xxx` - Get all blocks (optional filter by state)
- `GET /blocks/:id` - Get block by ID (with state populated)
- `PATCH /blocks/:id` - Update a block
- `DELETE /blocks/:id` - Delete a block

## Updated Modules

### Panchayat Module

**Changes:**

- Replaced `blockName` (string) with `blockId` (ObjectId reference)
- Added Block import to schema
- Added `block` virtual field for population
- Added blockId index
- Updated service to populate block in queries
- Updated CreatePanchayatDto to use blockId

**Population:**
All Panchayat queries now populate:

- `district` (District details)
- `cityVillage` (City/Village details)
- `block` (Block details with nested state)

## Benefits

1. **Data Integrity:** Block data is now centralized and referenced by ID
2. **Consistency:** Block names are managed in one place
3. **Relationships:** Blocks are properly linked to States
4. **Flexibility:** Easy to add more block-related fields in the future
5. **Query Efficiency:** Can filter blocks by state
6. **Population:** Full block and state details available in Panchayat queries

## Migration Notes

**Important:** Existing Panchayat records with `blockName` field will need to be migrated:

1. Create State records
2. Create Block records with proper stateId references
3. Update Panchayat records to use blockId instead of blockName

## API Examples

### Create a State

```bash
POST /states
{
  "stateName": "Chhattisgarh",
  "stateCode": "CG"
}
```

### Create a Block

```bash
POST /blocks
{
  "blockName": "Bastar Block",
  "stateId": "60d0fe4f5311236168a109ca"
}
```

### Create a Panchayat (Updated)

```bash
POST /panchayats
{
  "panchayatName": "Gram Panchayat A",
  "districtId": "60d0fe4f5311236168a109ca",
  "cityVillageId": "60d0fe4f5311236168a109cb",
  "blockId": "60d0fe4f5311236168a109cc",  // Now uses ID instead of name
  "sarpanchName": "Rajesh Kumar",
  "sarpanchContact": "9876543210",
  "panchayatSecretaryName": "Priya Singh",
  "panchayatSecretaryContact": "9876543211"
}
```

### Get Panchayat with Populated Data

```bash
GET /panchayats/:id

Response includes:
{
  "_id": "...",
  "panchayatName": "Gram Panchayat A",
  "district": { ... },
  "cityVillage": { ... },
  "block": {
    "_id": "...",
    "blockName": "Bastar Block",
    "state": {
      "_id": "...",
      "stateName": "Chhattisgarh",
      "stateCode": "CG"
    }
  },
  ...
}
```
