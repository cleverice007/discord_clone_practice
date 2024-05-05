# Discord Clone Practice

## Description
模仿 Discord 的練習 project，實現登入、加入好友、聊天、視訊（螢幕分享）等功能。目的在練習使用Socket,webRTC, 打造real time communication 的聊天、視訊project

## Tech Stack
- **前後端語言**: JavaScript
- **狀態管理**: React Redux
- **real time communication（邀請、加入好友，聊天）**: WebSockets
- **視訊功能（多人視訊、螢幕分享）**: WebSockets & WebRTC

## Features
- **用戶登入**: 允許用戶建立帳號並登入系統。
- **加入好友**: 用戶可以利用email 邀請其他用戶加入好友。
- **聊天功能**: 進行1對1 的即時聊天功能。
- **視訊通話**:
  - 用戶可以創造、加入、離開聊天室。
  - 與其他用戶進行視訊對話
  - 螢幕分享功能
# Project Structure

## Overview
前端根據功能區分為以下幾個主要資料夾：
- `components`
- `pages`
- `realtimeCommunication`
- `slices`


### `components`
- 存放可重複利用 UI components，如button, header, footer,unput等。

### `pages`
- 包含應用中每個頁面。每個頁面由多個 `components` 組件組合而成。
- Register Page
- Login Page
- Dashboard Page
  - 例如，`Dashboard` 頁面由以下組件組成：
    - `Sidebar`：
    - `FriendsSidebar`：好友列表
    - `Messenger`：與用戶聊天的區域
    - `AppBar`：

### `realtimeCommunication`
- 負責處理所有real time communication功能。
  - 包括接收和發送 socket 事件。
  - 負責建立和管理 WebRTC 的 peer connections。
   - **聊天流程**：
    - **發起邀請**：
      - 用戶輸入電子郵件並發起 `invite friend` event到後端。
      - 後端使用 MongoDB 搜尋用戶是否存在。
      - 若找到用戶，後端發起 `invite` event給該用戶。
    - **接受邀請**：
      - 用戶接受好友邀請後，後端在 `friend invitation` db schema中刪除該邀請資料。
      - 同時，將該用戶添加到 `friend` schema 中作為新的好友。
    - **進行聊天**：
      - 用戶之間可以進行聊天。
      - 聊天訊息通過 socket 發送，並利用 socket 即時更新聊天記錄。
**視訊流程**：
    - **建立房間**：
      - 用戶按下 `create room` button。
      - 發送 `create room`event到後端，後端儲存userId和 socket Id。
      - 前端將建立者的用戶名使用 Redux 儲存，供後續使用。
    - **新房間通知**：
      - 後端向所有連接的用戶發送 `new room` event，通知有新房間建立。
    - **用戶加入房間**：
      - 其他用戶加入房間後，發送 `join room` event，後端更新房間參與者列表。
    - **獲取和儲存媒體流程**：
      - 使用 `navigator.mediaDevices` 獲取本地媒體流（stream）。
      - 透過 Redux 儲存 stream，以便於整個應用中使用。
    - **建立 Peer Connection**：
      - 對房間內的每位參與者，建立 peer connection。
    - **視訊和音訊流傳送**：
      - 透過建立的 peer connections，接收和發送媒體流。
      - 進行視訊通話，並處理相應的 `signal` 事件以維持連接的穩定性。


### `slices`
- 利用 Redux Toolkit 的 `createSlice` 功能，管理應用的狀態和邏輯。
  - **data flow**：
    - 數據從 Redux 的 `slices` 流向 `components`，由上層components傳遞到下層components。
    - 上層components通過 Redux 獲得數據。
    - 下層components透過 props 接收 handler functions 和其他數據。

後端部分，包含用戶認證、好友邀請、即時通訊等功能

## Directory Structure

- `controllers`: 包含所有的控制器，用於處理req & res。
- `middlewares`: auth & authSocket。
- `routes`: 定義 API 路徑和相關的請求處理。
- `models`: 定義mongodb schema。
- `socketHandlers`: 處理所有與 WebSocket 相關的事件和邏輯。

### Controllers
- `auth`: 處理用戶登入相關的業務邏輯。
- `friendInvitation`: 處理好友邀請的相關請求。

### Middlewares
- `auth`: 檢查 JWT token，並將驗證後的用戶信息添加到 `req.user`。
- `authSocket`: 處理 WebSocket 連接時的身份驗證，從 `handshake.auth` 屬性中獲取 token。

### Routes
- 本部分將根據 `controllers` 中定義的邏輯來設定 API 的路由。

### Models
- 定義與database 交互所需的所有schema。

### SocketHandlers
- `roomCreateHandler ＆ roomJoinHandler &  roomLeaveHandler`: 處理建立、加入、離開房間的事件。
- `connectHandler & disconnectHandler`: 管理用戶的連接和重連事件。
- `directChatHistoryHandler & directMessageHandler`: 處理聊天歷史的請求和回應。
- `roomSignalingDataHandler`: 處理視訊通話中的 signaling 數據，並發送必要的事件到接收者。
