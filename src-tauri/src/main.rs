#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]


struct Database;

#[derive(serde::Serialize)]
struct CustomRersponse {
    message: String,
    other_val: usize,
}

async fn some_other_function() -> Option<String> {
    Some("response".into())
}

#[tauri::command]
async fn data_command(
    window: tauri::Window,
    number: usize,
    _database: tauri::State<'_, Database>,
) -> Result<CustomRersponse, String> {
    println!("Called from {}", window.label());
    let result: Option<String> = some_other_function().await;
    if let Some(message) = result {
        Ok(CustomRersponse {
            message,
            other_val: 42 + number,
        })
    } else {
        Err("No result".into())
    }
}

fn main() {
    tauri::Builder::default()
        .manage(Database {})
        .invoke_handler(tauri::generate_handler![data_command])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
